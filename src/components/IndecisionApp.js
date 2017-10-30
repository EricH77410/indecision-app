import React from 'react'

// Components
import AddOption from './AddOption';
import Options from './Options'
import Header from './Header'
import Action from './Action'
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component{
    
    state = {
        options: [],
        selectedOption: undefined
    }

    addoption = (value)=>{
        if (!value) {
             return 'Enter valid value to add option'
        } else if (this.state.options.indexOf(value) > -1){
             return 'This option already exist !'
        }

        this.setState((prev)=>({
            options: prev.options.concat(value)
        }))
    }

    removeOneOption = (opt)=> {
        this.setState((prev) => ({
            options: prev.options.filter((o)=>{
                return opt !== o
            })
        }))
    }

    handleDeleteOptions=()=>{
        this.setState(()=>({options:[]}))
    }    

    handlePick=()=>{
        const id = Math.floor(Math.random() * this.state.options.length);
        console.log(this.state.options[id]);
        this.setState(()=>({selectedOption:this.state.options[id]}))
    }

    handleClearSelectedOption=()=>{
        this.setState(()=>({selectedOption:undefined}));
    }

    componentDidMount(){
        try {
            const opt = JSON.parse(localStorage.getItem('options'))
            if (opt) {
                this.setState(()=>({options: opt}))
            }      
        } catch(e) {
            // ne fais rien si les données du localStoareg sont pourries
            console.log(e);
        } 
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json)
        }       
    }

    componentWillUnmount(){
        console.log('component will unmount')        
    }

    render(){
        return (
            <div>
                <Header title={'Indecision'} subtitle={'Put your life in the hands of a computer'}/>
                <div className="container">
                    <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            removeOneOption={this.removeOneOption}
                        />
                        <AddOption add={this.addoption}/>
                    </div>
                </div>
                
                
                <OptionModal 
                    selectedOption={this.state.selectedOption} 
                    close={this.handleClearSelectedOption}/>
            </div>
        )
    }
}