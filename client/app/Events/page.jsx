"use client"
import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./events.css"



export default function Events() {
    const [sliderRef] = useKeenSlider({
        slides: {
          perView: 4,
          spacing: 25,
        },
      })
    
      return (
        <>
        <div className="events h-screen w-full p-10 overflow-scroll bg-slate-950">
            <div className='relative flex items-center bg-slate-950' style={{height:'250px'}}>
                <form className='event-search-form text-center items-center mx-auto mt-16'>
                    <h2 className="text-5xl t-12 mb-12">Busca tu evento</h2>
                    <input  type="text" className='bg-violet-950 rounded-lg p-2'></input>
                </form>
            </div>
            <div className="text-center">
                <div className="event-title mx-auto border-b-2 mb-8 bg-slate-950">
                    <h3 className="text-4xl mt-6 mb-4">Musica</h3>
                </div>
                <div ref={sliderRef} className="keen-slider bg-slate-950">
                    <div className="keen-slider__slide number-slide1">1</div>
                    <div className="keen-slider__slide number-slide2">2</div>
                    <div className="keen-slider__slide number-slide3">3</div>
                    <div className="keen-slider__slide number-slide4">4</div>
                    <div className="keen-slider__slide number-slide5">5</div>
                    <div className="keen-slider__slide number-slide6">6</div>
                </div>
                <button className="mostrar-mas mx-auto mt-10 mb-10 bg-violet-950 pl-7 pr-7 pt-3 pb-3 text-xl rounded-lg">Mostrar más</button>
            </div>
            <div className="text-center">
                <div className="event-title mx-auto border-b-2 mb-8">
                    <h3 className="text-4xl mt-6 mb-4">Politica</h3>
                </div>
                <div ref={sliderRef} className="keen-slider bg-slate-950 ">
                    <div className="keen-slider__slide number-slide1">1</div>
                    <div className="keen-slider__slide number-slide2">2</div>
                    <div className="keen-slider__slide number-slide3">3</div>
                    <div className="keen-slider__slide number-slide4">4</div>
                    <div className="keen-slider__slide number-slide5">5</div>
                    <div className="keen-slider__slide number-slide6">6</div>
                </div>
                <button className="mostrar-mas mx-auto mt-10 mb-10 bg-violet-950 pl-7 pr-7 pt-3 pb-3 text-xl rounded-lg">Mostrar más</button>
            </div>
            <div className="text-center">
                <div className="event-title mx-auto border-b-2 mb-8">
                    <h3 className="text-4xl mt-6 mb-4">Deportes</h3>
                </div>
                <div ref={sliderRef} className="keen-slider ">
                    <div className="keen-slider__slide number-slide1">1</div>
                    <div className="keen-slider__slide number-slide2">2</div>
                    <div className="keen-slider__slide number-slide3">3</div>
                    <div className="keen-slider__slide number-slide4">4</div>
                    <div className="keen-slider__slide number-slide5">5</div>
                    <div className="keen-slider__slide number-slide6">6</div>
                </div>
                <button className="mostrar-mas mx-auto mt-10 mb-10 bg-violet-950 pl-7 pr-7 pt-3 pb-3 text-xl rounded-lg">Mostrar más</button>
            </div>
            <div className="text-center">
                <div className="event-title mx-auto border-b-2 mb-8">
                    <h3 className="text-4xl mt-6 mb-4">Teatro</h3>
                </div>
                <div ref={sliderRef} className="keen-slider ">
                    <div className="keen-slider__slide number-slide1">1</div>
                    <div className="keen-slider__slide number-slide2">2</div>
                    <div className="keen-slider__slide number-slide3">3</div>
                    <div className="keen-slider__slide number-slide4">4</div>
                    <div className="keen-slider__slide number-slide5">5</div>
                    <div className="keen-slider__slide number-slide6">6</div>
                </div>
                <button className="mostrar-mas mx-auto mt-10 mb-10 bg-violet-950 pl-7 pr-7 pt-3 pb-3 text-xl rounded-lg">Mostrar más</button>
            </div>
        </div>
        </>
      )
  }