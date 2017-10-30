import React from 'react'
import Option from './Option'

const Options = (props) => (

    <div>
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
       
            <button
                className="button button--link" 
                onClick={props.handleDeleteOptions}
            >Remove All
            </button>
        </div>

    {props.options.length === 0 && <p className="widget__message">Ajouter une option pour démarrer</p>}
    {
        props.options.map((opt, index) => (
            <Option
                key={opt}
                option={opt}
                count={index+1}
                removeOneOption={props.removeOneOption}
            />
        ))
    }
    </div>
);

export default Options