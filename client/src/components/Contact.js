import React, {useState} from 'react';
import axios from 'axios'


const Contact = () => {
  const initState = {
    yourEmail: '',
    name: '',
    subject: '',
    text: '',
  }
  const [inputs, setInputs] = useState(initState)
  const [complete, setComplete] = useState(false)

  console.log(inputs)
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/feedback', {
      subject: inputs.subject,
      name: inputs.name,
      email: inputs.yourEmail,
      text: inputs.text,

    })
    .then(res => {

      res.status === 200 && setComplete(prev => (!prev))
    })
    .catch(err => {
      console.error(err)
    })

  }
  const handleChange = (e) => {
    const { name, value, } = e.target;
    setInputs(prev => ({...prev, [name]: value }))

  }
  return (<>
    <form onSubmit={handleSubmit}>
      <hr />
      <input placeholder="your email" value={inputs.yourEmail} name="yourEmail" onChange={handleChange} />
      <input placeholder="name" value={inputs.name} name="name" onChange={handleChange} />
      <hr />
      <input placeholder="Subject" value={inputs.subject} name="subject" onChange={handleChange} />
      <br />
      <textarea rows='4' cols='50' placeholder="tell us about your experience" value={inputs.text} name="text" onChange={handleChange} />
      <br />
      <button>Submit</button>
    </form>
    {complete && <p>your feedback has been recieved. </p> }

    </>
  );
};

export default Contact;