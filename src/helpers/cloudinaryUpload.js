export const uploadImageToCloudinary = async (croppedImageBase64) => {
    // const blob = await fetch(croppedImageBase64).then(res => res.blob());
    // const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
  
    const formData = new FormData();
    formData.append('file', croppedImageBase64);
     formData.append('upload_preset', 'g8tdsfxs'); 
    formData.append('cloud_name', 'drlmfmgjs'); 
  
    const res = await fetch("https://api.cloudinary.com/v1_1/drlmfmgjs/image/upload", {
      method: 'POST',
      body: formData
    });
  
    const data = await res.json();
    console.log(data.secure_url);
    return data.secure_url;
  };