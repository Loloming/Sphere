import React from 'react';

export default function Filters() {


    return (
        <form className="flex flex-row flex-nowrap bg-gradient bg-sixty-percent-home justify-evenly w-full h-20">
            <div className="flex flex-col justify-center bg-gradient-to-r from-sixty-percent-home via-sixty-percent-description to-sixty-percent-home p-3">
                <label className="text-teal-50 font-semibold">Fecha de publicación</label>
                <select className="bg-sixty-percent-variant text-teal-50 rounded-lg">
                    <option value={false}>Sin filtros</option>
                    <option value='date'>Más reciente</option>
                    <option value='date'>Más antiguo</option>
                </select>
            </div>
            <div className="flex flex-col justify-center bg-gradient-to-r from-sixty-percent-home via-sixty-percent-description to-sixty-percent-home p-3">
                <label className="text-teal-50 font-semibold">Likes</label>
                <select className="bg-sixty-percent-variant text-teal-50 rounded-lg">
                    <option value={false}>Sin filtros</option>
                    <option value='date'>Más likes</option>
                    <option value='date'>Menos likes</option>
                </select>
            </div>
            <div className="flex flex-col justify-center bg-gradient-to-r from-sixty-percent-home via-sixty-percent-description to-sixty-percent-home p-3">
                <label className="text-teal-50 font-semibold">Comentarios</label>
                <select className="bg-sixty-percent-variant text-teal-50 rounded-lg">
                    <option value={false}>Sin filtros</option>
                    <option value='date'>Más comentarios</option>
                    <option value='date'>Menos comentarios</option>
                </select>
            </div>
        </form>
    )
}