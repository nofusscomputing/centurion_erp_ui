import Select from "../components/form/Select";
import Slider from "../components/form/Slider";
import TextArea from "../components/form/Textarea";
import TextField from "../components/form/Textfield";



const Create = () => {

    const values=[
        {
            label: 'One',
            value: '1'
        }
    ]

    return (
        <section>
            <div className="content">
                <form>
                    <TextField
                        label      = 'Name'
                        helptext   = 'this is the helptext for a form field.'
                        error_text = 'An error on this field'
                        required   = 'true'
                    />
                    <TextArea
                        label      = 'Description'
                        helptext   = 'this is the helptext for a form field.'
                        // error_text = 'An error on this field'
                        // required   = 'true'
                    />
                    <Select
                        label      = 'Organization'
                        helptext   = 'this is the helptext for a form field.'
                        // error_text = 'An error on this field'
                        values={[
                            {
                                label: 'One',
                                value: '1'
                            },
                            {
                                label: 'Two',
                                value: '2'
                            }
                        ]}
                    />
                    <Slider
                        label    = 'Is a Template'
                        helptext = 'this is the helptext for a form field.'
                        // error_text = 'An error on this field'
                        required   = 'true'
                    />
                    <div style={{
                        display: 'flexbox',
                        width: '100%'
                    }}>
                        <div style={{
                                // backgroundColor: '#00cc00',
                                display: 'block',
                                padding: 'auto',
                                margin: 'auto',
                                width: 'fit-content'
                            }}>
                            <button className="form common-field">Save</button>
                            <button className="form common-field inverse">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
     );
}
 
export default Create;
