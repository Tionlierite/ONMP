import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from '@mui/icons-material/Search';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './calculator.css';
import {CalculationParametr} from './models';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addDrugs } from '../../../shared/store/actions/calculatorActions.js'
import { useHistory } from "react-router-dom";

const api = 'https://apu-hd.fun/api/v1'

const doseText = (age, medicine) => {
	if(age > 17) {
		return `${medicine.unit}`;
	}

	let childDoseText = `${medicine.unit}`;

	switch (medicine.child_dosage_unit) {
		case CalculationParametr.Age:
			childDoseText += '/year'
			break;
	
		case CalculationParametr.Weight:
			childDoseText += '/kg'
			break;
	}

	return childDoseText
}


const setDose = (age, weight, medicine) => {	
	if(age > 17){
		return medicine.diagnoses[0].dose;
	}
	let coef;
	switch (medicine.child_dosage_unit) {
		case CalculationParametr.Age:
			coef = age;
			break;
		case CalculationParametr.Weight:
			coef = weight;
			break;
		default:
			coef = 1;
	}

	return (medicine.diagnoses[0]?.dose * coef).toFixed(2);
}


const Medicines = (props) => {
	const medicines = props.medicines;
	const age = useSelector(state => state.age.initialAge)
	const dispatch = useDispatch()
	let medicinesList = [];
	const history = useHistory()

	function changeMedicinesList(ckeckbox, name, dose, unit) {
		if(ckeckbox) {
			medicinesList.push(
				{
					name: name,
					dose: dose,
					unit: unit
				}
			)
		}
		else {
			const idx = medicinesList.findIndex(p => p.name===name);
			medicinesList.splice(idx, 1);
		}
	}

	if(!medicines.length){
		return <>
			<div>Ничего не найдено :с</div>
		</>
	}

	const finalMedicines = medicines.map(medicine => ({
		...medicine,
		diagnoses: objToArray(medicine.diagnoses).map(
			item => (
				{
					title: item.title,
					dose:(age > 17 ? item.adult_dosage : item.child_dosage)
				}
			)
		).filter(item => item.dose)
	}))

	function saveMedicineList() {
		const res = medicinesList.reduce(
			(accumulator, curValue, index) => {
				if(index) {
					accumulator += ', '
				}
				accumulator += `${curValue.name} ${curValue.dose} ${curValue.unit}`

				return accumulator;
			}, ''
		)

		dispatch(addDrugs(res))
		history.push("/createCard")
	}

	return <>
		<Typography variant="subtitle1" component={'p'} className="count-text">
			Найдено {props.medicines.length} результата
		</Typography>
		{
			finalMedicines.map(
				medicine => <Medicine key={medicine.title} medicine={medicine} changeMedList={changeMedicinesList}/>
			)
		}
		<div className="btn">
			<Button variant="contained" onClick={saveMedicineList}>Сохранить</Button>
		</div>
	</>
}

const Medicine = (props) => {
	const [expanded, setExpanded] = useState(false);
	const [checked, setChecked] = useState(false);
	const age = useSelector(state => state.age.initialAge)
	const weight = useSelector(state => state.weight.initialWeight);
	const medicine = props.medicine;
	const togleExpanded = () => {
		setExpanded(!expanded);
	}

	const togleChecked = () => {
		setChecked(!checked);
		props.changeMedList(!checked, medicine.genitive, input, medicine.unit)
	}

	function handleInputChange(event) {
		setInput(event.target.value);
	}

	const [input, setInput] = useState(setDose(age, weight, medicine));

	return <>
		<Accordion onClick={togleExpanded}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="h5">
					{medicine.title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<div className="details">
					<div className="enter-dose">
					<TextField
						id="input-with-icon-textfield"
						label="Введите дозировку"
						InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								{medicine.unit}
							</InputAdornment>
						),
						}}
						variant="standard"
						value={input}
						onChange={handleInputChange}
					/>
					<Checkbox checked={checked} onClick={togleChecked} name={medicine.name}/>
					</div>
					<Typography variant="h6" component={'p'}>
						Дозировки
					</Typography>
					<div>
					{	
						medicine.diagnoses.map(
							item => <Typography key={item.title} variant="subtitle1" component={'p'}>{item.title}: {item.dose} {doseText(age, medicine)}</Typography>
						)
					}
					</div>
					<Typography variant="h6" component={'p'}>
						Противопоказания
					</Typography>
					{
						medicine.contraindications.map(
							(item, index) => <Typography key={index} variant="subtitle1" component={'p'}>{item}</Typography>
						)
					}
				</div>
			</AccordionDetails>
		</Accordion>
	</>
}


function objToArray(medicines: Object){
	return Object.keys(medicines).map(item =>({...medicines[item], title: item}))
}


const Calculator = () => {
	const [query, setQuery] = useState('');
	const [medicines, setMedicines] = useState([]);

	useEffect(() => {
		axios.get(`${api}/medicines/get_medicines/`, {
			params: {
				search: query
			}
		})
		.then(function (response) {
			setMedicines(objToArray(response.data))
		})
		.catch(function (error) {
			console.log(error);
		});
	}, [query])

	function handleQueryChange(event) {
		setQuery(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
	}

	return <>
		<div className="content">
			<div className="main-content">
				<Paper
					component="form"
					className="form"
					onSubmit={handleSubmit}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Введите название действующего вещества"
						value={query}
				        onChange={handleQueryChange}
					/>
					<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
							<SearchIcon />
					</IconButton>
				</Paper>
				
				<Medicines medicines={medicines}/>
			</div>
		</div>
	</>
}

export default Calculator
