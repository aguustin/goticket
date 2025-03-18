import './ev.css'
import pruebaJpg from "@/app/assets/prueba.jpg"

const Ev = () => {
    return(
        <>
            <div className="flex p-9 mt-16 bg-slate-900 w-screen">
                <div className="p-6">
                    <img src={pruebaJpg.src} alt=""></img>
                </div>
                <div className="p-6">
                    <h5 className='text-3xl'>Noteworthy technology acquisitions 2021</h5><br></br>
                    <p className='text-xl'>Adress: 9 de julio Mendoza Argentina</p><br></br>
                    <p className='text-xl'>Fecha: 17/02/2025</p><br></br>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptatibus, provident tempora suscipit architecto nesciunt, facilis non molestias porro nostrum facere ducimus ex maxime culpa illum cum quae perspiciatis quam!</p><br></br>
                    <p>Personas que asisten al evento: 26</p><br></br>
                    <h5>Compra tus entradas:</h5><br></br>
                    <div className='flex'>
                        <div className="purchase-categories">
                            <div className="flex items-center mt-3">
                                <p>Categoria A:</p>
                                <div className="purchase-tickets flex ml-6 items-center justify-between w-[130px]">
                                    <button className="bg-yellow-500 text-black p-1 pl-4 pr-4"><p>-</p></button>
                                    <p className="text-white">0</p>
                                    <button className="bg-yellow-500 text-black p-1 pl-4 pr-4"><p>+</p></button>
                                </div>
                            </div>
                        </div>
                        <div className='text-center ml-6'>
                            <button className='mx-auto bg-yellow-500 text-black rounded-lg p-3 ml-6 text-xl'>Comprar mis entrada</button>
                            <button className='mx-auto bg-slate-950 rounded-lg p-3 ml-6 text-xl'>Cancelar compra</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ev