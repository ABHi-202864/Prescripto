import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";


const DoctorProfile = () => {
  const { profileData, setProfileData, getProfileData, dToken } = useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div>
      <div className="flex flex-col gap-4 m-5">
        <div>
          <img className="bg-primary/80 w-full sm:max-w-64 rounded-lg" src={profileData.image} alt="" />
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          {/* Doc info : name, degree, experince */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{profileData.experience}</button>
          </div>

          {/* Doc about :  */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">About:</p>
            <p>{profileData.about}</p>
          </div>
          <p>Appointment fee: <span>{currency} {profileData.fees}</span></p>
          <div>
            <p>Address:</p>
            <p>{profileData.address.line1}</p>
            <p>{profileData.address.line2}</p>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Available</label>
          </div>
          <button>Edit</button>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
