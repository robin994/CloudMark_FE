import { useState, useEffect } from 'react'
import './css_components/TabellaPresenze.css'
import axios from 'axios'


export default function TabellaPresenze() {
    const [reveal, setReveal] = useState(true)
    const [presenze, setPresenze] = useState([])

    async function getPresenze() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_FASTAPI_URL}/presence/all/first_name/last_name/`)
            setPresenze(response.data.data)
        } catch(error) {
            throw error
        }
    }

    useEffect(()=> {
        getPresenze()
    }, [])

    const test = presenze.map((el, index) => {
        return (
            <tr ng-repeat="name in getdrugnameNewArray" key={index}>
                <td><input type="text" placeholder="prova" /></td>
                {
                    Object.values(el).map((e: any, i) => {
                        return (
                            <td key={i}>
                                <div className='input-group mb-3'>
                                    <input type="text" className='form-control' placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={e} />
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
        if (reveal == true) {
            setReveal(false)
        } else {
            setReveal(true)
        }
    }

    return (
        <>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />

            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="col-md-auto">N#</th>
                            {
                                presenze.map((e: any, i: any) => {
                                    return (
                                        <th key={i} className='cold-md-auto'>{Object.keys(e)[i]}</th>
                                    )
                                })
                            }
                    </tr>
                </thead>
                <tbody>
                    {    
                        reveal == true ? test2 : test  
                    }
                </tbody>
            </table>
            <button className='btn btn-info' onClick={change}>Modifica</button>
        </>
    )
}