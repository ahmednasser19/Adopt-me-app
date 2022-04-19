import { Component } from 'react'
import { useParams } from 'react-router-dom'

class Details extends Component {
    //as the class is initialized run this constructor function
    // constructor(props) {
    //     super(props);

    //     this.state = { loading: true };
    // }
    state = { loading: true }
    //run once it's equal to useEffect( ()=>{} , [])
    async componentDidMount() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
        );
        const json = await res.json();
        this.setState(Object.assign({ loading: false }, json.pets[0]));
    }

    render() {

        if (this.state.loading) {
            return (<h2>Loading</h2>)
        }

        const { animal, breed, city, state, description, name } = this.state;
        return (
            <div className='details'>
                <div>
                    <h1>{name}</h1>
                    <h2>{animal} - {breed} - {city},{state}</h2>
                </div>
                <button>Adopt {name}</button>
                <p> {description}</p>
            </div>
        )
    }
}

const WrappedDetails = () => {
    const params = useParams();
    return <Details params={params} />
}
export default WrappedDetails;

