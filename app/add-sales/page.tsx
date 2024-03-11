"use client";
import { useState, useRef, useEffect } from "react";
import {
  createStyles,
  Button,
  Container,
  Textarea,
  Box,
  Title,
  TextInput,
  Select,
  Modal,
  Radio,
  Tooltip,
  Autocomplete,
  NumberInput,
  Grid,
  FileButton,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import Link from "next/link";
import Image from "next/image";
import AnimalAdded from "../..//components/Animals/animalAdded";
import { DateInput } from "@mantine/dates";
import Back from "../../components/btnBack";
import { Message_data } from "../../context/context";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_ANIMAL_CATEGORIES_BREEDS, GET_ANIMAL_TYPE } from "../../lib/graphql/salesAnimal/queries";
import PhoneInput from "react-phone-input-2";
import AddSireDamModal from "./addSireDamModal";
import MediaAdded from "../../components/Animals/mediaAdded";
import { GET_SEARCH_ANIMAL } from "../../lib/graphql/salesAnimal/mutation";
import { showNotification } from "@mantine/notifications";
import VideoPlayer from "../../components/videoplayer";
import { replaceString } from "../../utils/commonHelper";
import lang from "../../constants/language";

const enquiryData = [
  { value: "ENQUIRE_IN_APP", label: "Enquire in app" },
  { value: "TEXT", label: "Text" },
  { value: "PHONE", label: "Phone" },
  { value: "EMAIL", label: "Email" }
];

const useStyles = createStyles((theme) => ({
  animalLists: {},
}));

const AddSalesAnimal = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const { message } = useContext(Message_data);
  const [opened, { open, close }] = useDisclosure(false);

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const resetRef = useRef<() => void>(null);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const contentRef = useRef<any>();
  const [animalListArray, setAnimalListArray] = useState([]);
  const [pricingDuration, setPricingDuration] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [subCategoryArray, setSubCategoryArray] = useState([]);
  const [selectedAnimalType, setSelectedAnimalType] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [value1, setValue] = useState();
  const [mediaFiles, setMediaFiles] = useState([]);
  const [enquiryDataArray, setEnquiryDataArray] = useState(enquiryData);
  const [ind, setInd] = useState('');
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [state, setState] = useState({0:enquiryData});

  const { data: animalList } = useQuery(GET_ANIMAL_TYPE);
  const [getCategory, {data: categoryList} ] = useLazyQuery(GET_ANIMAL_CATEGORIES_BREEDS);
  const [getSubCategory, {data: subCategoryList} ] = useLazyQuery(GET_ANIMAL_CATEGORIES_BREEDS);
  const [getAnimalDataList, {data: animalDataList}] = useMutation(GET_SEARCH_ANIMAL,
    {
      variables:{
        searchAnimalInput: {
          listingName: null,
          gender: null
        }
      }
    });

  const form = useForm({
    initialValues: {
      media: [],
      listingName: "",
      description: "",
      price: "",
      gender: "",
      animalType: "",
      animalSubCategory:"",
      animalCategory:"",
      adsDurationType:"",
      showOnProfile:"true",
      breed:"",
      pureBred:"",
      enquiryPreference:[{
        enquiryType: null,
        enquiryValue: ""
      }],
      fatherDetail: {
        image: null,
        listingName: null
      },
      motherDetail: {
        image: null,
        listingName: null
      },
      desexed: null,
      dateOfBirth: null
    },
    validateInputOnChange: true,
    validate: {
      media: (value) =>
        value.length
          ? null
          : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Media"),
      listingName: (value) =>
        value
          ? null
          : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Listing name"),
      description: (value) =>
        value
          ? null
          : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Description"),
      gender: (value) =>
        value
          ? null
          : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Sex"),
      price: (value) =>
        value
          ? null
          : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Price"),
      animalType: (value) =>
        value
          ? null
          : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Animal type"),
      breed: (value) =>
        value
          ? null
          : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Breed"),
      pureBred: (value) =>
      value
        ? null
        : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Purebred"),
      enquiryPreference: (value) =>
        value[0].enquiryType
        ? null
        : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Enquiry preferences"),
    }
  });
  useEffect(()=>{
    if(message){
      form.setValues(
        {
          ...form,
          media: message
        }
      )
    }
    setAnimalListArray(animalList?.ListNewAnimalType?.newAnimalTypes);
    getAnimalDataList();
  }, [message, animalList]);

  useEffect(()=>{
    if(categoryList?.ListCategoriesAndBreeds?.categoriesAndBreeds.length){
      setCategoryArray(categoryList?.ListCategoriesAndBreeds?.categoriesAndBreeds ? categoryList?.ListCategoriesAndBreeds?.categoriesAndBreeds : []);
      if(categoryList?.ListCategoriesAndBreeds?.categoriesAndBreeds.length > 0 && 
        categoryList?.ListCategoriesAndBreeds?.categoriesAndBreeds.length ==1) {
        setCategoryArray([]);
        if(categoryList?.ListCategoriesAndBreeds?.categoriesAndBreeds?.[0].breeds?.length) 
        setBreeds(categoryList?.ListCategoriesAndBreeds?.categoriesAndBreeds?.[0].breeds);
      }
    }
  }, [categoryList]);

  useEffect(()=>{
    if(subCategoryList?.ListCategoriesAndBreeds?.categoriesAndBreeds.length){
      setSubCategoryArray(subCategoryList?.ListCategoriesAndBreeds?.categoriesAndBreeds);
    }

  }, [subCategoryList]);

  const toggleVideoModal = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const submitHandler = async (values) => {
    console.log(values);
  };

  const getAnimalAutocompleteData = (animalArray)=>{
    let autoCompleteDataArray = [];
    animalArray?.map((animal, i)=>{
      let obj = {
        value: animal.name,
        label: animal.name,
        hasCategory: animal.hasCategory,
        id: animal._id
      };
      autoCompleteDataArray.push(obj)
    })
    return autoCompleteDataArray;
  }

  const handleValueChange = async (val) => {
    if(val){
      form.setFieldValue('animalType', val);
      const animalTypeId = animalListArray.filter((animal) => animal.name === val);
      if(animalTypeId.length){
        setPricingDuration(animalTypeId[0].pricing);
        setSelectedAnimalType(animalTypeId[0]._id);
        if(animalTypeId[0]?.breeds?.length) setBreeds(animalTypeId[0].breeds);
          getCategory({
            variables:{
              input: {
                animalTypeId: animalTypeId[0]._id
              }
            }
          });
      }
    } else {
      setSelectedAnimalType("");
      form.setValues(
        {
          ...form,
          animalCategory: ""
        }
      )
      setCategoryArray([]);
      setSubCategoryArray([]);
      setBreeds([]);
      setPricingDuration([]);
    }
  };
  const pricingData = pricingDuration.length > 0 ? pricingDuration.map((provider) => `${provider.month} months/$${provider.price}`): [];

  const handleCategoryChange = async (val) => {
    setSubCategoryArray([]);
    if(val){
      form.setFieldValue('animalCategory', val);
      const animalTypeId = categoryArray?.filter((category) => category.name === val);
      if(animalTypeId.length){
        if(animalTypeId[0].breeds?.length) setBreeds(animalTypeId[0].breeds);
        if(animalTypeId[0].hasCategory){
          getSubCategory({
            variables:{
              input: {
                animalTypeId: selectedAnimalType,
                hasCategory: animalTypeId[0].hasCategory,
                categoryId:animalTypeId[0]._id
              }
            }
          });
        }
      }
    }else {
      setSelectedAnimalType("");
      form.setValues(
        {
          ...form,
          animalSubCategory: ""
        }
      )
      setSubCategoryArray([]);
    }
  };

  const handleSubCategoryChange = async (val) => {
    form.setFieldValue('animalSubCategory', val);
    const animalTypeId = subCategoryArray.filter((category) => category.name === val);
    if(animalTypeId.length){
      if(animalTypeId[0].breeds?.length) setBreeds(animalTypeId[0].breeds);
    }
  };
  const getBreedsAutoData =(dataArry) =>{
    let autoCompleteDataArray = [];
    dataArry.map((animal, i)=>{
      let obj = {
        value: animal,
        label: animal,
      };
      autoCompleteDataArray.push(obj)
    })
    return autoCompleteDataArray;
  }
  const addEnquiry = () => {
    form.setValues(
      {
        ...form,
        enquiryPreference: [
          ...form.values.enquiryPreference,
          {
            enquiryType: null,
            enquiryValue: null
          }
        ]
      }
    )
    let findIdex = enquiryDataArray.findIndex(x => x.value ===ind);
    let newEnquiry: any = [...enquiryDataArray];
    newEnquiry.splice(findIdex, 1);
    setEnquiryDataArray(newEnquiry);
    setState({...state, [`${form.values.enquiryPreference.length}`]:newEnquiry})
  };
  const removeEnquiry = (index) => {
    let newEnquiryPreference: any = [...form.values.enquiryPreference];
    console.log("newEnquiryPreference",newEnquiryPreference[index] );
    if(newEnquiryPreference[index].enquiryType){
      const addObj = { 
        value: newEnquiryPreference[index].enquiryType, 
        label: (newEnquiryPreference[index].enquiryType.charAt(0).toUpperCase() + newEnquiryPreference[index].enquiryType.slice(1).toLowerCase()).replace(/_/g,' ') 
      }
      console.log("addObj",addObj)
      const filteredEnquiryArray = enquiryDataArray.filter((obj: any) => obj.value === addObj.value)
      if(!filteredEnquiryArray.length){
        let newEnquiry: any = [...enquiryDataArray, addObj];
        setEnquiryDataArray(newEnquiry);
      }
    }
    
    newEnquiryPreference.splice(index, 1);
    form.setValues(
      {
        ...form,
        enquiryPreference: newEnquiryPreference
      }
    )
    
  };
  const clearFile = (i) => {
    let newMedia = [...mediaFiles];
    newMedia.splice(i, 1);
    setMediaFiles(newMedia);
  };

  const handleMediaToggle = () => {
    setIsMediaOpen((prev) => !prev);
  };

  const handleMediaClose = () => {
    setIsMediaOpen(false);
  };
  const handleAddMedia = (files) => {
    const filesMedia = [];
    let filesCount = [...files, ...mediaFiles] ;
    let videoCount = 0;
    if(filesCount.length > 1){
      filesCount.map(file => {
        if(file.type === "video/mp4"){
          videoCount++;
        }
      });
      if(videoCount > 1){
        return showNotification({
          message: "Upload  Video Files limit exceeded. Please limit to 1 video only.",
          title: "Error!",
          color: "red",
        });
      }
    }
    if(filesCount.length <= 7 && videoCount < 2){
      files.map((file,i) =>{
        let mediaObj = {
          isCover: false,
          file: file,
          caption: null
        }
        filesMedia.push(mediaObj);
      })
      
      setMediaFiles([...mediaFiles,...filesMedia])
    } else {
      showNotification({
        message: "Upload Files limit exceeded. Please limit to 7 files only.",
        title: "Error!",
        color: "red",
      });
    }
  }
  const handleMediaFiles = () =>{
    form.setValues(
      {
        ...form,
        media: mediaFiles
      }
    )
    setIsMediaOpen(false);
  }
  const handleEnquiryChange = (val,index) =>{
    form.setFieldValue(`enquiryPreference.${index}.enquiryType`,val)
    setInd(val);
  }

  const getFilteredArray = () => {
    const filteredArray = form?.values?.media?.filter((media: any) => media.isCover)
    return filteredArray;
  }

  const renderImage = () =>{
    const arr = [];
    if(!getFilteredArray().length){
      for (let i = 1; i < form?.values?.media?.length; i++) {
        (!(form?.values?.media[i]?.isCover) && form?.values?.media[i]?.file?.type !== "video/mp4") ? arr.push(
          <Box className="img-wrap">
            <div className="img">
              <Image
                src={URL.createObjectURL(form?.values?.media[i]?.file)}
                width={64}
                height={60}
                alt="image description"
              />
            </div>
          </Box>
        ) :
        arr.push(
          <Box className="img-wrap">
            <div className="img">
              <video
                src={URL.createObjectURL(form?.values?.media[i]?.file)}
                width={64}
                height={60}
              />
            </div>
            <Button className="btn-play" onClick={toggleVideoModal}>
              <Image
                src="/icon-play.svg"
                width={22}
                height={24}
                alt="icon play"
              />
            </Button>
            <VideoPlayer
              videoSrc={URL.createObjectURL(form?.values?.media[i]?.file)}
              isVideoOpen={isVideoOpen}
              toggleVideoModal={toggleVideoModal}
            />
          </Box>
        )
      }
      return arr;
    }
    form?.values?.media?.map((image,i)=>{
      !image.isCover && arr.push(
        <Box className="img-wrap">
          <div className="img">
            <Image
              src={URL.createObjectURL(image.file)}
              width={64}
              height={60}
              alt="image description"
            />
          </div>
        </Box>
      )
    });
    return arr;
  }
  const renderPlaceHolderImage = () =>{
    const arry = [];
    for (let i = 0; i < 7 - form?.values?.media?.length; i++) {
      arry.push(
        <Box className="img-wrap">
          <div className="img"></div>
        </Box>
      )
    }
    return arry;
  }
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="add-animal-block"
    >
      <Container size="xl">
        <Box
          sx={(theme) => ({
            maxWidth: "1164px",
            margin: "0 auto",
          })}
        >
          <Back href="/user-profile" />

          <Box
            sx={(theme) => ({
              position: "relative",

              [theme.fn.largerThan("md")]: {
                paddingLeft: "86px",
              },
            })}
          >
            <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
              <Box
                sx={(theme) => ({
                  maxWidth: "571px",
                })}
              >
                <Title order={2} size="h2" mb="8px" color="#45110B">
                  Add new listing
                </Title>
                <Title order={3} size="h4" mb="8px" color="#45110B">
                  Listing and animal details
                </Title>
                {form?.values?.media?.length > 0 && (
                  <Box className={`animal-media-lists ${classes.animalLists}`}>
                    
                    {getFilteredArray().length ? getFilteredArray().map((image:any,i)=>{
                      return (
                        <Box className="first-image img-wrap" key={i}>
                          <div className="img">
                            <Image
                              src={URL.createObjectURL(image.file)}
                              width={136}
                              height={127}
                              alt="image description"
                            />
                          </div>
                        </Box>
                      )
                    }): (
                      <Box className="first-image img-wrap">
                          <div className="img">
                            <Image
                              src={URL.createObjectURL(form?.values?.media?.[0]?.file)}
                              width={136}
                              height={127}
                              alt="image description"
                            />
                          </div>
                        </Box>
                    )}
                    <Box className="sub-images">
                      {renderImage()}
                      {renderPlaceHolderImage()}
                    </Box>
                  </Box>
                )}
                <Box>
                  <Button
                    // component="a"
                    // href="/add-media"
                    className="btn-outline"
                    size="lg"
                    fullWidth
                    mb="18px"
                    onClick={handleMediaToggle}
                  >
                    Add media
                  </Button>
                  {form.errors?.media && (
                    <Text c="red" size="xs">
                      {replaceString(
                        lang.REQUIRED_VALIDATION,
                        "{field}",
                        "Media"
                      )}
                    </Text>
                  )}

                  <Modal opened={isMediaOpen} onClose={handleMediaClose} title={"Add media"}>
                    {mediaFiles?.length > 0 && (
                      <MediaAdded mediaArray={mediaFiles} clearFile={clearFile} setMediaFiles={setMediaFiles}/>
                    )}
                    <FileButton onChange={(payload)=> handleAddMedia(payload)} accept="image/png,image/jpeg" multiple >
                    {(props) =>
                      <Button {...props} className="btn-outline" size="lg" fullWidth mb="30px">
                        Add more media
                      </Button>
                    }
                    </FileButton>
                    <Button size="lg" fullWidth onClick={handleMediaFiles}>
                      Save Changes
                    </Button>
                  </Modal>
                  <TextInput
                    placeholder="Name of listing"
                    label="Name of listing"
                    mb="18px"
                    {...form.getInputProps("listingName")}
                  />
                  <Select
                    label="Sex"
                    placeholder="Select"
                    data={[
                      { value: "MALE", label: "Male" },
                      { value: "FEMALE", label: "Female" },
                      { value: "ANY", label: "Any" }
                    ]}
                    rightSection={
                      <Image
                        src="/arrow_drop_down.svg"
                        width={24}
                        height={24}
                        alt="dropdown"
                      />
                    }
                    mb="18px"
                    {...form.getInputProps("gender")}
                  />
                  <NumberInput
                    label="Price"
                    placeholder="Price"
                    hideControls={true}
                    min={0}
                    mb="18px"
                    {...form.getInputProps("price")}
                  />
                  <Textarea
                    placeholder="Description"
                    label="Description"
                    mb="24px"
                    {...form.getInputProps("description")}
                  />
                  <Box>
                  <Title order={3} size="h4" mb="8px" color="#45110B">
                    Category
                  </Title>
                  <Autocomplete
                    label="Animal type"
                    placeholder="Select"
                    data={animalListArray?.length ? getAnimalAutocompleteData(animalListArray): []}
                    mb="24px"
                    onChange={handleValueChange}
                    error={form.errors?.animalType ? "Animal type is required" : false}
                  />
                  {categoryArray.length > 0 && (
                    <Autocomplete
                    label="Category"
                    placeholder="Select"
                    data={categoryArray?.length ? getAnimalAutocompleteData(categoryArray): []}
                    mb="24px"
                    onChange={handleCategoryChange}
                  />
                  )}
                  {subCategoryArray.length > 0 && (
                    <Autocomplete
                    label="Sub category"
                    placeholder="Select"
                    data={subCategoryArray?.length ? getAnimalAutocompleteData(subCategoryArray): []}
                    mb="24px"
                    onChange={handleSubCategoryChange}
                  />
                  )}
                  {form?.values?.animalType && (
                    <Select
                    label="Ads for duration"
                    placeholder="Select"
                    data={pricingData}
                    rightSection={
                      <Image
                        src="/arrow_drop_down.svg"
                        width={24}
                        height={24}
                        alt="dropdown"
                      />
                    }
                    mb="24px"
                    {...form.getInputProps("adsDurationType")}
                  />
                  )}
                  <Autocomplete
                    label="Breed"
                    placeholder="Select"
                    data={breeds?.length ? getBreedsAutoData(breeds): []}
                    mb="24px"
                    {...form.getInputProps("breed")}
                  />

                  <Select
                    label="Purebred"
                    placeholder="Purebred"
                    data={[
                      { value: "PUREBRED", label: "Purebred" },
                      { value: "CROSSBRED", label: "Crossbred" }
                    ]}
                    rightSection={
                      <Image
                        src="/arrow_drop_down.svg"
                        width={24}
                        height={24}
                        alt="dropdown"
                      />
                    }
                    mb="24px"
                    {...form.getInputProps("pureBred")}
                  />
                  </Box>
                  <Box>
                  <Title order={3} size="h4" mb="8px" color="#45110B">
                  Contact preference
                </Title>
                {form?.values?.enquiryPreference.map((element,index)=>{
                  return (
                    <Box key={index}>
                      <Grid>
                        <Grid.Col span="auto">
                        <Select
                          label="Enquiry preferences"
                          placeholder="Select"
                          data={state[index]}
                          rightSection={
                            <Image
                              src="/arrow_drop_down.svg"
                              width={24}
                              height={24}
                              alt="dropdown"
                            />
                          }
                          mb="24px"
                          onChange={(val)=>handleEnquiryChange(val,index)}
                          error={form?.errors?.enquiryPreference ? "Enquiry preferences is required" : false}
                        />
                        </Grid.Col>
                        {form?.values?.enquiryPreference.length > 1 && (
                        <Grid.Col span={2}>
                          <Button className="btn-link" size="lg" onClick={()=>removeEnquiry(index)} mt={38}>
                          <Image
                            src="/icon-delete.svg"
                            width={22}
                            height={24}
                            alt="icon delete"
                          />
                          </Button>
                        </Grid.Col>
                        )}
                      </Grid>
                       
                      {form?.values?.enquiryPreference[index].enquiryType === "EMAIL" && (
                        <TextInput
                          placeholder="Email"
                          mb="18px"
                          {...form.getInputProps(`enquiryPreference.${index}.enquiryValue`)}
                        />
                      )}
                      {(form?.values?.enquiryPreference[index].enquiryType === "TEXT" || 
                      form?.values?.enquiryPreference[index].enquiryType === "PHONE") && (
                        <Box className="tel-input" mb="18px">
                          <PhoneInput
                            country={"au"}
                            inputProps={{
                              name: "phone",
                              autoFocus: true,
                              placeholder: "Phone",
                            }}
                            {...form.getInputProps(`enquiryPreference.${index}.enquiryValue`)}
                          />
                        </Box>
                      )}
                    </Box>
                  )}
                )}
                
                {form?.values?.enquiryPreference[0].enquiryType && enquiryDataArray.length > 1 &&(
                  <Box style={{ marginBottom: "24px" }}>
                    <Button className="btn-link" size="lg" onClick={addEnquiry}>
                      Add contact type
                    </Button>
                  </Box>
                )}
                  </Box>
                  <Box>
                    <Box className="title-with-tooltip">
                      <Title order={4} size="h4" mb="18px" color="#45110B">
                        Show on my profile
                      </Title>
                      <Tooltip label="By selecting No, the ad will only display to customers in the classified search but won't be visible to customers when viewing your profile.">
                        <Button className="tooltip">
                          <Image
                            src="/Info.svg"
                            width={24}
                            height={24}
                            alt="info icon"
                          />
                        </Button>
                      </Tooltip>
                    </Box>

                    <Radio.Group name="show-profile" className="radio-inline" mb="18px" {...form.getInputProps("showOnProfile")}>
                      <Radio value="true" label="Yes" checked={Boolean(form?.values.showOnProfile)}/>
                      <Radio value="false" label="No" checked={Boolean(form?.values.showOnProfile)}/>
                    </Radio.Group>
                  </Box>

                  <Title
                    order={3}
                    size="h4"
                    pb="17px"
                    onClick={handleToggle}
                    color="#45110B"
                    className={`additional-info-opener${isOpen ? " active" : ""}`}
                  >
                    Additional information
                  </Title>
                  <Box
                    className="additional-info"
                    ref={contentRef}
                    style={{
                      height: isOpen
                        ? `${contentRef.current.scrollHeight}px`
                        : "0",
                    }}
                  >
                    <Title order={4} size="h4" color="#45110B" mb="18px">
                      Age
                    </Title>
                    <DateInput
                      valueFormat="YYYY/MM/DD"
                      label="DOB"
                      placeholder="YYYY/MM/DD"
                      icon={
                        <Image
                          src="/icon-calendar-orange.svg"
                          width={24}
                          height={24}
                          alt="calendar"
                        />
                      }
                      mb="24px"
                      {...form.getInputProps("dateOfBirth")}
                    />
                    <Select
                      label="Desexed"
                      placeholder="Select"
                      data={[
                        { value: "YES", label: "Yes" },
                        { value: "NO", label: "No" },
                      ]}
                      rightSection={
                        <Image
                          src="/arrow_drop_down.svg"
                          width={24}
                          height={24}
                          alt="dropdown"
                        />
                      }
                      mb="24px"
                      {...form.getInputProps("desexed")}
                    />

                  <Title order={4} size="h4" color="#45110B" mb="18px">
                    Add lineage details
                  </Title>

                  <AnimalAdded />

                  <Button
                    className="btn-outline"
                    onClick={()=>{open(); setModalType("Sire") }}
                    mb={24}
                    fullWidth
                    size="lg"
                  >
                    Add Sire/Father
                  </Button>
                  <Button
                    onClick={()=>{open(); setModalType("Dam") }}
                    className="btn-outline"
                    mb={24}
                    fullWidth
                    size="lg"
                  >
                    Add Dam/Mother
                  </Button>
                  <AddSireDamModal
                    type={modalType}
                    openModal={opened}
                    handleDialogClose={close}
                    form={form}
                    animalDataList={animalDataList?.SearchAnimal?.animals.length ? getAnimalAutocompleteData(animalDataList?.SearchAnimal?.animal): getAnimalAutocompleteData(animalListArray)}
                  />
                  </Box>
                </Box>

                <Button type="submit" fullWidth size="lg">
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddSalesAnimal;
