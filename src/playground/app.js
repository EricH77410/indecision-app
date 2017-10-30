
class IndecisionApp extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                options: this.props.options
            }
            this.addoption = this.addoption.bind(this)
            this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
            this.handlePick = this.handlePick.bind(this)
            this.removeOneOption = this.removeOneOption.bind(this)
        
    }

    componentDidMount(){
        try {
            const opt = JSON.parse(localStorage.getItem('options'))
            if (opt) {
                this.setState(()=>({options: opt}))
            }      
        } catch(e) {
            // ne fais rien si les données du localStoareg sont pourries
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

    addoption(value){
         if (!value) {
             return 'Enter valid value to add option'
         } else if (this.state.options.indexOf(value) > -1){
             return 'This option already exist !'
         }

        this.setState((prev)=>({
            options: prev.options.concat(value)
            }))

    }

    removeOneOption(opt) {
        this.setState((prev) => ({
            options: prev.options.filter((o)=>{
                return opt !== o
            })
        }))
    }

    handleDeleteOptions(){
        this.setState(()=>({options:[]}))
    }
    

    handlePick(){
        const id = Math.floor(Math.random() * this.state.options.length);
        console.log(this.state.options[id]);
    }
    render(){
        return (
            <div>
            <Visi/>
                <Counter />
                <Header title={'Indecision'} subtitle={'Put your life in the hands of a computer'}/>
                <Action 
                hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}
                />
                <Options 
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                removeOneOption={this.removeOneOption}
                />
                <AddOption add={this.addoption}/>
            </div>
        )
    }
}

class Counter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            counter:0
        }
        this.add = this.add.bind(this)
        this.min = this.min.bind(this)
        this.reset = this.reset.bind(this)
    }

    componentDidMount(){
        try {
            const c = JSON.parse(localStorage.getItem('count'));
            if (!isNaN(c)) {
                this.setState(()=>({counter:parseInt(c)}))
            }
        } catch (e) {

        }        
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.counter !== this.state.counter){
            localStorage.setItem('count',this.state.counter)
        }
        
    }

    add(val){
        this.setState((prev)=>{
            return {counter: prev.counter+val}
        })
    }
    min(val){
        this.setState((prev)=>{
          return  {counter: prev.counter-val}
        })
    }
    reset(){
        this.setState(()=>{
            return {
                counter:0
            }
        })
    }

    render(){
        return (
            <div>
                <h3>Count : {this.state.counter}</h3>
                <button onClick={()=>this.add(1)}>+1</button>
                <button onClick={()=>this.min(1)}>-1</button>
                <button onClick={()=>this.add(5)}>+5</button>
                <button onClick={()=>this.min(5)}>-5</button>
                <button onClick={this.reset}>Reset</button>
             </div>
        )


    }
}

class Visi extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Visible: true
        }
    }
    handleVis(){
        this.setState(()=>{
            return {Visible: !this.state.Visible}
        })
    }
    render() {
        const vis = () =>{
            if (this.state.Visible){
                return 'I am visible !'
            } else {
                return 'I am hidden'
            }
        }
        return(
            <div>
                <p>{vis()}</p>
                <button onClick={this.handleVis.bind(this)}>click on me</button>
            </div>
            
        )
    }
}

class Header extends React.Component {
        
    render(){
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        )
    }
}

class Action extends React.Component{

    render(){
        return (
            <div>
                <button 
                onClick={this.props.handlePick}
                disabled={this.props.hasOptions===false}
                >What should I do ?
                </button>
            </div>
        )
    }    
}

class Options extends React.Component{

    render(){
        const renderList = this.props.options.map((item,index)=>{
            return (<Option 
            option={item} 
            key={index}
            removeOneOption={this.props.removeOneOption}
            />)
        })
        return (
            <div>                
                <p>Il y a {this.props.options.length} chose à faire</p>
                    {renderList}
                <button 
                onClick={this.props.handleDeleteOptions}
                >Remove All</button>
                {this.props.options.length === 0 && <p>Ajouter une option pour démarrer</p>}
            </div>
        )
    }
}


const Option = (props) => {
    return (
        <div>
            {props.option}
            <button onClick={()=>props.removeOneOption(props.option)}>Remove</button>
        </div>
    )
}

class AddOption extends React.Component{
    constructor(props){
        super(props)
        this.addOption = this.addOption.bind(this)
        this.state = {
            msg:undefined
        }
    }
    addOption(e){
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
                <form onSubmit={this.addOption}>
                    {this.state.msg && <p>{this.state.msg}</p>}
                    <input type="text" name="option"/>
                    <button>Add option</button>
                </form>
            </div>
        )
    }
}


ReactDOM.render(<IndecisionApp options={['Faire les courses', 'Faire à manger']}/>,document.getElementById('app'))