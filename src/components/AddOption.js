import React from 'react';

export default class AddOption extends React.Component{

    state = {
        msg: undefined
    }

    addOption = (e)=>{
        e.preventDefault();
        const opt = e.target.elements.option.value.trim();        
        const retour = this.props.add(opt);
        if (!retour) {
            e.target.elements.option.value=''
        }
        this.setState(()=>({msg: retour}))
          
    }
    render(){
        return (
            <div>
                {this.state.msg && <p className="add-option-error">{this.state.msg}</p>}
                <form onSubmit={this.addOption} className="add-option">                    
                    <input className="add-option__input" type="text" name="option"/>
                    <button className="button">Add option</button>
                </form>
            </div>
        )
    }
}