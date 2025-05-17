import "./SettingsButton.css";

export default function SettingsButton({isVisible}){
  return(
    <button className={`settings-btn ${isVisible ? "" : "off"}`}> 
      <i class="fa-solid fa-gear"></i>
    </button>
  )
}