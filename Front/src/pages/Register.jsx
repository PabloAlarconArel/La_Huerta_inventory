import {useForm} from 'react-hook-form'


export function Register(){
    const {register} = useForm()
    return(
        <div>
        <input type='email'{...register("username",{required:true})}/>
        <input type='password'{...register("password",{required:true})}/>
        <input type='type'{...register("type",{required:true})}/>
        

        </div>
    )

            
    
}