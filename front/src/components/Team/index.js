// == Import de la lib React
import React from 'react';

// == Import npm

// == Imports locaux
import './style.scss';
import imgMaite from 'src/assets/images/maite.jpg';
import imgAlex from 'src/assets/images/alex.png';
import imgVeronika from 'src/assets/images/veronika.jpg';
import imgLouis from 'src/assets/images/louis.png';

const Team = () => (
  <div className="team radio-btns">
    <div className="team-card radio-btns__btn" role="radio" aria-checked="false" aria-label="Select image one">
      <div className="team-card-img" style={{ backgroundImage: `url('${imgLouis}')` }} />
      <div className="team-card-header">
        <div className="team-card-header-name">Louis Villain</div>
      </div>
      <div className="team-card-content">
        <div className="team-card-content-role">Product Owner</div>
        <div className="team-card-content-quote">
          “La tour Eiffel… entièrement faite avec des allumettes, 346 422 exactement !”
          <br />
          – François Pignon
        </div>
      </div>
    </div>
    <div className="team-card radio-btns__btn" role="radio" aria-checked="false" aria-label="Select card two">
      <div className="team-card-img" style={{ backgroundImage: `url('${imgMaite}')` }} />
      <div className="team-card-header">
        <div className="team-card-header-name">Maite Delgado</div>
      </div>
      <div className="team-card-content">
        <div className="team-card-content-role">Scrub Master</div>
        <div className="team-card-content-quote">
          “I have not failed. I’ve just found 10,000 ways that won’t work.”
          <br />
          – Thomas A. Edison
        </div>
      </div>
    </div>
    <div className="team-card radio-btns__btn" role="radio" aria-checked="false" aria-label="Select card three">
      <div className="team-card-img" style={{ backgroundImage: `url('${imgAlex}')` }} />
      <div className="team-card-header">
        <div className="team-card-header-name">Alex Viard </div>
      </div>
      <div className="team-card-content">
        <div className="team-card-content-role">
          Lead Dev Front
          <span className="team-card-content-role-subrole"> & Git Master</span>
        </div>
        <div className="team-card-content-quote">
          “Le copier-coller a été programmé par des programmeurs pour des programmeurs en fait.”
        </div>
      </div>
    </div>
    <div className="team-card radio-btns__btn" role="radio" aria-checked="false" aria-label="Select card four">
      <div className="team-card-img" style={{ backgroundImage: `url('${imgVeronika}')` }} />
      <div className="team-card-header">
        <div className="team-card-header-name">Veronika GREBENSHCHIKOVA</div>
      </div>
      <div className="team-card-content">
        <div className="team-card-content-role">Lead Dev Back</div>
        <div className="team-card-content-quote">
          “Victoriae mundis et mundis lacrima. 
          Bon, ça ne veut absolument rien dire, mais je trouve que c’est assez dans le ton.”
        </div>
      </div>
    </div>
  </div>
);

export default Team;
