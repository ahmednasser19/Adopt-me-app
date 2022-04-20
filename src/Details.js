import { Component } from 'react'
import { useParams } from 'react-router-dom'
import Carsouel from './Carousel';
import ErrorBoundary from './ErrorBoundar';
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
    //as the class is initialized run this constructor function
    // constructor(props) {
    //     super(props);

    //     this.state = { loading: true };
    // }
    state = { loading: true, showModal: false }
    //run once it's equal to useEffect( ()=>{} , [])
    async componentDidMount() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
        );
        const json = await res.json();
        this.setState(Object.assign({ loading: false }, json.pets[0]));
    }
    toggleModal = () => this.setState({ showModal: !this.state.showModal });

    render() {

        if (this.state.loading) {
            return (<h2>Loading</h2>)
        }



        const { animal, breed, city, state, description, name, images, showModal } = this.state;
        return (
            <div className='details'>
                <Carsouel images={images} />
                <div>
                    <h1>{name}</h1>
                    <h2>{animal} - {breed} - {city},{state}</h2>
                </div>
                <ThemeContext.Consumer>
                    {([theme]) => (
                        <button onClick={this.toggleModal} style={{ backgroundColor: theme }}>Adopt {name}</button>
                    )}
                </ThemeContext.Consumer>;
                <p> {description}</p>
                {
                    showModal ? (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {name}?</h1>
                                <div className="buttons">
                                    <a href="https://bit.ly/pet-adopt">Yes</a>
                                    <button onClick={this.toggleModal}>No</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null
                }
            </div>
        )
    }
}

const WrappedDetails = () => {
    const params = useParams();
    return (
        <ErrorBoundary>
            <Details params={params} />
        </ErrorBoundary>
    )
}
export default WrappedDetails;

