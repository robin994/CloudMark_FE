import { useState, useEffect } from 'react'
import './css_components/TabellaPresenze.css'
import axios from 'axios'

export default function TabellaPresenze() {
    const [reveal, setReveal] = useState(true)
    const [presenze, setPresenze] = useState([])
    const [inputPresenze, setInputPresenze] = useState([])
    const[date_presence, setDatePresence] = useState()
    const[tipo_presenza, setTipoPresenza] = useState()
    const[hours, setHours] = useState()

    const arr: any = []
    let typeInput = "text"
    async function getPresenze() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_FASTAPI_URL}/presence/all/first_name/last_name/`)
            setPresenze(response.data.data)
        } catch (error) {
            throw error
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_FASTAPI_URL}/presence/insertUpdate`, {
            inputPresenze:[{
            idDipendente : presenze,
            dataPresenza : date_presence,
            tipoPresenza : tipo_presenza,
            idCommessa : presenze,
            ore : hours
        }]

        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    useEffect(() => {
        getPresenze()
    }, [])

    presenze.map((el, index) => {
        return arr.push(Object.keys(el)[index])
    })
    console.log(arr)


    const test = presenze.map((el, index) => {
        console.log(Object.keys(el)[index])

        return (
            <tr ng-repeat="name in getdrugnameNewArray" key={index}>
                <td><input type="text" placeholder="prova" /></td>
                {
                    Object.values(el).map((e: any, i) => {
                        // console.log()
                        // if (Object.keys(el)[index] === "hours") {
                        //     typeInput = "number"
                        // }
                        // if (Object.keys(el)[index] === "hours") {
                        //     typeInput = "date"
                        // }

                        return (
                            <td key={i}>
                                <div className='input-group mb-3'>
                                    <input type={typeInput} className='form-control' placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={e} />
                                </div>
                            </td>
                        )

                    })
                }
            </tr>
        )
    })

    const test2 = presenze.map((el, index) => {
        return (
            <tr ng-repeat="name in getdrugnameNewArray" key={index}>
                <td className='cold-md-auto'>prova</td>
                {
                    Object.values(el).map((e: any, i) => {
                        return (
                            <td key={i} className='cold-md-auto'>{e}</td>
                        )
                    })
                }
            </tr>
        )
    })

    let change = () => {
        if (reveal === true) {
            setReveal(false)
        } else {
            setReveal(true)
        }
    }
    console.log(presenze)
    return (
        <>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />

            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="col-md-auto text-center custom-head">N#</th>
                        {
                            presenze.map((e: any, i: any) => {
                                return (
                                    <th key={i} className='cold-md-auto text-center custom-head'>{Object.keys(e)[i]}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        reveal === true ? test2 : test
                    }
                </tbody>
            </table>
            <button className='btn btn-info' onClick={change}>Modifica</button>
        </>
    )
}