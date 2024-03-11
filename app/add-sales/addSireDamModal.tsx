import { createRef, useState } from 'react';
import 'cropperjs/dist/cropper.css';
import CropperComponent from '../../components/cropper';
import { Box, Button, Dialog, FileButton, Group, Image, Modal, Select, Stack, Text, TextInput, Title } from '@mantine/core';
import AnimalAdded from '../../components/Animals/animalAdded';

const AddSireDamModal = ({ openModal, handleDialogClose, type, form, animalDataList}) => {
	const [sireFile, setSireFile] = useState<File>();
  	const [damFile, setDamFile] = useState<File>();

	
	const clearFileHandle = () => {
		if(type === "Sire") {
			form.setFieldValue('fatherDetail.image', null); 
			setSireFile(null);
		} else {
			form.setFieldValue('motherDetail.image', null);
			setDamFile(null);
		}
	}
	const handleSelectAnimal = (val) => {
		const animalTypeId = animalDataList.filter((animal) => animal.value === val);
		if(type === "Sire") {
			form.setFieldValue('fatherId', animalTypeId[0].id); 
		} else {
			form.setFieldValue('motherId', animalTypeId[0].id);
		}
	}
	const getAnimalValue = (id) =>{
		const animalTypeId = animalDataList.filter((animal) => animal.id === id);
		return animalTypeId?.[0]?.value;
	}
	return (
		<Modal opened={openModal} onClose={handleDialogClose} title={`Add ${type} details`}>
			<Box>
				<Select
					label="Select animal"
					placeholder="Select"
					data={animalDataList}
					rightSection={
						<Image
						src="/arrow_drop_down.svg"
						width={24}
						height={24}
						alt="dropdown"
						/>
					}
					mb="18px"
					onChange={handleSelectAnimal}
					value={(type === "Dam") ? getAnimalValue(form?.values?.motherId):getAnimalValue(form?.values?.fatherId)}
				/>
			</Box>
			<Box component="span">or</Box>
			<Title order={4} size="h4" color="#45110B" my="24px">
				Add basic animal information
			</Title>
			<Box>
				<TextInput
					placeholder="Name"
					label="Animal listing name"
					mb="18px"
					{...(type === "Dam") ?
						form.getInputProps('motherDetail.listingName')
					:
						form.getInputProps('fatherDetail.listingName')
					}
				/>
			</Box>

			<AnimalAdded 
				clearFile={clearFileHandle}
				file={type === "Sire" ? sireFile : damFile}
				type= {type}
			/>
			{((type === "Sire" && form?.values?.fatherDetail?.image === null ) || 
			(type === "Dam" && form?.values?.motherDetail?.image === null)) && (
				<FileButton
					accept="image/png,image/jpeg" 
					onChange={(file: any) => {
						if (file) {
						const uploadFile = file;
						if(type === "Dam"){
							form.setFieldValue('motherDetail.image', URL.createObjectURL(uploadFile));
							setDamFile(uploadFile);
						} else {
							form.setFieldValue('fatherDetail.image', URL.createObjectURL(uploadFile));
							setSireFile(uploadFile);
						}
						}
					}}
					>
					{(props) => 
					<Button
						{...props}
						className="btn-outline"
						size="lg"
						fullWidth
						mb="24px "
					>
						Add Image
					</Button>
					}
				</FileButton>
			)}
			
			<Button size="lg" fullWidth onClick={handleDialogClose}>
				Continue
			</Button>
		</Modal>
	);
};

export default AddSireDamModal;
