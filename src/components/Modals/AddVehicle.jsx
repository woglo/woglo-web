import { faMultiply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { addVehicle } from '../../services/api/user/apiMethods';
import { uploadImageToCloudinary } from '../../helpers/cloudinaryUpload';

function AddVehicle({ isOpen, onClose }) {
  const user = useSelector((state)=>state.auth.userDetails)
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const initialValues = {
    capacity: '',
    category: '',
    name: '',
    year: '',
    colour: '',
    registrationNumber: '',
    location: '',
    driverName: '',
    driverNumber: '',
    fuelType: '',
    insuranceNumber: '',
    insuranceName: '',
    insuranceExpiry: '',
    fitnessNumber: '',
    fitnessExpiry: '',
    permitNumber: '',
    permitExpiry: '',
    rcImages: [],
    permitImage: null,
    fitnessImage: null,
    insuranceImage: null,
    vehicleImages: [],
  };

  const validationSchemaStep1 = yup.object({
    name: yup
      .string()
      .trim()
      .matches(/^[A-Za-z\s]+$/, 'Name must contain only letters and spaces')
      .min(3, 'Name must be at least 3 characters')
      .max(25, 'Name cannot be more than 25 characters')
      .required('Required'),
    capacity: yup
      .number()
      .positive('Capacity must be a positive number')
      .integer('Capacity must be an integer')
      .required('Required'),
    driverNumber: yup
      .string()
      .matches(/^\d+$/, 'Driver number must contain only digits')
      .required('Required'),
    registrationNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Registration number can only cotains numbers')
      .required('Required'),
    year: yup
      .number()
      .positive('Year must be a positive number')
      .integer('Year must be an integer')
      .min(1900, 'Year should be 1900 or later')
      .max(new Date().getFullYear(), `Year should not be greater than ${new Date().getFullYear()}`)
      .required('Required'),
    colour: yup
      .string()
      .trim()
      .matches(/^[A-Za-z\s]+$/, 'Colour must contain only letters and spaces')
      .required('Required'),
    category: yup
      .string()
      .trim()
      .required('Required'),
    driverName: yup
      .string()
      .trim()
      .matches(/^[A-Za-z\s]+$/, 'Driver name must contain only letters and spaces')
      .required('Required'),
    location: yup
      .string()
      .trim()
      .required('Required'),
    fuelType: yup
      .string()
      .trim()
      .required('Required'),
  });
  const validationSchemaStep2 = yup.object({
    insuranceNumber: yup.string().trim().required('Required'),
    insuranceName: yup.string().trim().required('Required'),
    insuranceExpiry: yup.date().required('Required'),
    fitnessNumber: yup.string().trim().required('Required'),
    fitnessExpiry: yup.date().required('Required'),
    permitNumber: yup.string().trim().required('Required'),
    permitExpiry: yup.date().required('Required'),
  });
  const validationSchemaStep3 = yup.object({
    rcImages: yup
      .array()
      .of(
        yup.mixed()
          .test('fileType', 'Only JPG, PNG, and JPEG files are allowed', (value) => {
            if (value) {
              return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
            }
            return true;
          })
          .test('fileSize', 'Each file should be less than or equal to 1 MB', (value) => {
            if (value) {
              return value.size <= 1024 * 1024;
            }
            return true;
          })
      )
      .min(2, 'Please upload at least 2 RC images')
      .max(2, 'You can upload a maximum of 2 RC images')
      .required('RC images are required'),
    permitImage: yup
      .mixed()
      .test('fileType', 'Only JPG, PNG, and JPEG files are allowed', (value) => {
        if (value) {
          return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }
        return true;
      })
      .test('fileSize', 'File should be less than or equal to 1 MB', (value) => {
        if (value) {
          return value.size <= 1024 * 1024;
        }
        return true;
      })
      .required('Permit image is required'),
    fitnessImage: yup
      .mixed()
      .test('fileType', 'Only JPG, PNG, and JPEG files are allowed', (value) => {
        if (value) {
          return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }
        return true;
      })
      .test('fileSize', 'File should be less than or equal to 1 MB', (value) => {
        if (value) {
          return value.size <= 1024 * 1024;
        }
        return true;
      })
      .required('Fitness image is required'),
    insuranceImage: yup
      .mixed()
      .test('fileType', 'Only JPG, PNG, and JPEG files are allowed', (value) => {
        if (value) {
          return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }
        return true;
      })
      .test('fileSize', 'File should be less than or equal to 1 MB', (value) => {
        if (value) {
          return value.size <= 1024 * 1024;
        }
        return true;
      })
      .required('Insurance image is required'),
    vehicleImages: yup
      .array()
      .of(
        yup.mixed()
          .test('fileType', 'Only JPG, PNG, and JPEG files are allowed', (value) => {
            if (value) {
              return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
            }
            return true;
          })
          .test('fileSize', 'Each file should be less than or equal to 1 MB', (value) => {
            if (value) {
              return value.size <= 1024 * 1024;
            }
            return true;
          })
      )
      .min(3, 'Please upload at least 3 vehicle images')
      .max(3, 'You can upload a maximum of 3 vehicle images')
      .required('Vehicle images are required'),
  });
  

  // const onSubmit = async (values, { setSubmitting }) => {
  //   console.log('Form data', values);
  //   try {
  //     const startTime =  Date.now()
  //     // const rcImageUrls = await Promise.all(
  //     //  values.rcImages.map((file)=>uploadImageToCloudinary(file))
  //     // )
  //     // const permitImageUrl = await uploadImageToCloudinary(values.permitImage);
  //     // const fitnessImageUrl = await uploadImageToCloudinary(values.fitnessImage);
  //     // const insuranceImageUrl = await uploadImageToCloudinary(values.insuranceImage);
  //     // const vehicleImageUrls = await Promise.all(
  //     // values.vehicleImages.map((file) => uploadImageToCloudinary(file))
  //     // );
  //     // const result = Date.now() - startTime;
  //     // console.log("Time taken for uploads:", result, "ms");
  //     // const finalData = {
  //     //   ...values,
  //     //   rcImages: rcImageUrls,
  //     //   permitImage: permitImageUrl,
  //     //   fitnessImage: fitnessImageUrl,
  //     //   insuranceImage: insuranceImageUrl,
  //     //   vehicleImages: vehicleImageUrls,
  //     //   userId: user._id
  //     // };
  //     const finalData = {
  //       ...values,
  //       rcImages: ['sdfas',['asdfasdf']],
  //       permitImage: "permitImageUrl",
  //       fitnessImage: "fitnessImageUrl",
  //       insuranceImage: "insuranceImageUrl",
  //       vehicleImages: ["asdfas","sadsdfsdf"],
  //       userId: user._id
  //     };
  //     toast.success("Image upload success")
  //     await addVehicle(finalData)
  //   } catch (error) {
  //     console.log("Error")
  //   }
  //   setSubmitting(false);
  // };

  const onSubmit = async (values, { setSubmitting }) => {
    console.log('Form data', values);
    try {
      const startTime = Date.now();
  
      const [
        rcImageUrls,
        permitImageUrl,
        fitnessImageUrl,
        insuranceImageUrl,
        vehicleImageUrls
      ] = await Promise.all([
        Promise.all(values.rcImages.map(file => uploadImageToCloudinary(file))),
        uploadImageToCloudinary(values.permitImage),
        uploadImageToCloudinary(values.fitnessImage),
        uploadImageToCloudinary(values.insuranceImage),
        Promise.all(values.vehicleImages.map(file => uploadImageToCloudinary(file)))
      ]);
  
      const result = Date.now() - startTime;
      console.log("Time taken for uploads:", result, "ms");
  
      const finalData = {
        ...values,
        rcImages: rcImageUrls,
        permitImage: permitImageUrl,
        fitnessImage: fitnessImageUrl,
        insuranceImage: insuranceImageUrl,
        vehicleImages: vehicleImageUrls,
        userId: user._id
      };
  
      toast.success("Image upload success");
      await addVehicle(finalData);
      onClose()
    } catch (error) {
      console.error("Error:", error);
      toast.error("Image upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = async (validateForm, values) => {
    const errors = await validateForm(values);
    const currentStepErrors = Object.keys(errors).filter(key => 
      step === 1 ? validationSchemaStep1.fields[key] :
      step === 2 ? validationSchemaStep2.fields[key] :
      validationSchemaStep3.fields[key]
    );
    
    if (currentStepErrors.length === 0) {
      setStep(step + 1);
    } else {
      toast.error("Fill all the Fields");
    }
  };

  const prevStep = (setErrors, errors) => {
    const currentStepFields = step === 2 ? Object.keys(validationSchemaStep2.fields) :
                              step === 3 ? Object.keys(validationSchemaStep3.fields) :
                              [];
    
    const newErrors = { ...errors };
    currentStepFields.forEach(field => {
      delete newErrors[field];
    });
    
    setErrors(newErrors);
    setStep(step - 1);
  };

  const renderStep = (setFieldValue,field,form) => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Name
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="name"
                id="name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Category
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="category"
                id="category"
              />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Seating Capacity
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="number"
                name="capacity"
                id="capacity"
              />
              <ErrorMessage name="capacity" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Manufacture Date
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="number"
                name="year"
                id="year"
              />
              <ErrorMessage name="year" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="colour" className="block text-sm font-medium text-gray-700 mb-1">
                Colour
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="colour"
                id="colour"
              />
              <ErrorMessage name="colour" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="registrationNumber"
                id="registrationNumber"
              />
              <ErrorMessage name="registrationNumber" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location of the Vehicle
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="location"
                id="location"
              />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="driverName" className="block text-sm font-medium text-gray-700 mb-1">
                Driver Name
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="driverName"
                id="driverName"
              />
              <ErrorMessage name="driverName" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="driverNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Driver Number
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="driverNumber"
                id="driverNumber"
              />
              <ErrorMessage name="driverNumber" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Type
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="fuelType"
                id="fuelType"
              />
              <ErrorMessage name="fuelType" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="insuranceNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Number
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="insuranceNumber"
                id="insuranceNumber"
              />
              <ErrorMessage name="insuranceNumber" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="insuranceName" className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Name
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="insuranceName"
                id="insuranceName"
              />
              <ErrorMessage name="insuranceName" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="insuranceExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Expiry
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="date"
                name="insuranceExpiry"
                id="insuranceExpiry"
              />
              <ErrorMessage name="insuranceExpiry" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="fitnessNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Fitness Number
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="fitnessNumber"
                id="fitnessNumber"
              />
              <ErrorMessage name="fitnessNumber" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="fitnessExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                Fitness Expiry
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="date"
                name="fitnessExpiry"
                id="fitnessExpiry"
              />
              <ErrorMessage name="fitnessExpiry" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="permitNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Permit Number
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="text"
                name="permitNumber"
                id="permitNumber"
              />
              <ErrorMessage name="permitNumber" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="permitExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                Permit Expiry
              </label>
              <Field
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                type="date"
                name="permitExpiry"
                id="permitExpiry"
              />
              <ErrorMessage name="permitExpiry" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>
        );
        case 3:
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="rcImages" className="block text-sm font-medium text-gray-700 mb-1">
                  RC (Front & Back side)
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  type="file"
                  name="rcImages"
                  onChange={(event) => {
                    setFieldValue("rcImages", Array.from(event.currentTarget.files));
                  }}
                  multiple
                  accept=".jpg,.jpeg,.png"
                />
                <ErrorMessage name="rcImages" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="permitImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Permit
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  type="file"
                  name="permitImage"
                  onChange={(event) => {
                    setFieldValue("permitImage", event.currentTarget.files[0]);
                  }}
                  accept=".jpg,.jpeg,.png"
                />
                <ErrorMessage name="permitImage" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="fitnessImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Fitness
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  type="file"
                  name="fitnessImage"
                  onChange={(event) => {
                    setFieldValue("fitnessImage", event.currentTarget.files[0]);
                  }}
                  accept=".jpg,.jpeg,.png"
                />
                <ErrorMessage name="fitnessImage" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="insuranceImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  type="file"
                  name="insuranceImage"
                  onChange={(event) => {
                    setFieldValue("insuranceImage", event.currentTarget.files[0]);
                  }}
                  accept=".jpg,.jpeg,.png"
                />
                <ErrorMessage name="insuranceImage" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="vehicleImages" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle images (Front side, Back side, Interior)
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  type="file"
                  name="vehicleImages"
                  onChange={(event) => {
                    setFieldValue("vehicleImages", Array.from(event.currentTarget.files));
                  }}
                  multiple
                  accept=".jpg,.jpeg,.png"
                />
                <ErrorMessage name="vehicleImages" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="w-full mt-14 md:w-1/2 lg:w-1/3 bg-white p-4 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Add Vehicle</h2>
            <FontAwesomeIcon icon={faMultiply} className="cursor-pointer text-gray-500" onClick={onClose} />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={
              step === 1 ? validationSchemaStep1 :
              step === 2 ? validationSchemaStep2 :
              validationSchemaStep3
            }
            onSubmit={onSubmit}
          >
            {({ setFieldValue, validateForm, values, errors, setErrors }) => (
              <Form>
                <div className='max-h-[calc(90vh-10rem)] overflow-y-auto'>
                  {renderStep(setFieldValue)}
                </div>
                <div className="mt-4 flex justify-between">
                  {step > 1 && (
                    <button 
                      type="button" 
                      onClick={() => prevStep(setErrors, errors)} 
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Back
                    </button>
                  )}
                  {step < 3 && (
                    <button 
                      type="button" 
                      onClick={() => nextStep(validateForm, values)} 
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Next
                    </button>
                  )}
                  {step === 3 && (
                    <button 
                      type="submit" 
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    );
  }
  
  export default AddVehicle;