import { Check, GameController } from 'phosphor-react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Input } from './Form/input';
import { useEffect, useState, FormEvent } from 'react';

import axios from 'axios'

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    async function handleCreateAd(event: FormEvent){
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData);

        try{
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel,
            })

            alert('Anuncio criado com sucesso!')
        } catch(err) {
            console.log(err);
            alert('Erro ao criar o anuncio')
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/70 inset-0 fixed' />

            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/50 '>
                <Dialog.Title className='text-3xl text-white font-black '>Publique um Anúncio</Dialog.Title>

                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                        <select 
                            name="game" 
                            id="game"
                            className='bg-zinc-900 py-3 px-4 rounded text-sm outline-none'
                        >
                             <option disabled defaultValue={'Selecione um game'} value="Selecione um game">Selecione um game</option>

                             {games.map(game => {
                                return(
                                    <option key={game.id} value={game.id}>{game.title}</option>
                                )
                             })}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input id="name" name='name' type="text" placeholder='Como te chamam no game?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input id="yearsPlaying" name='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu discord?</label>
                            <Input id="discord" name='discord' type="text" placeholder='Username#0000' />
                        </div>
                    </div>

                    <div className=' flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quanto costuma jogar?</label>

                            <ToggleGroup.Root 
                                type='multiple' 
                                className='grid grid-cols-5 gap-1'
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    title='Domingo'
                                    className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value='0'
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title='Segunda'
                                    className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value='1'
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title='Terça'
                                    className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value='2'
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title='Quarta'
                                    className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value='3'
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title='Quinta'
                                    className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value='4'
                                >
                                    Q   
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title='Sexta'
                                    className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value='5'
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title='Sabado'
                                    className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    value='6'
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input id='hourStart' name='hourStart' type="time" placeholder='De' />
                                <Input id='hourEnd' name='hourEnd' type="time" placeholder='Até' />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex items-center gap-2 text-sm'>
                        <Checkbox.Root 
                            checked={useVoiceChannel}
                            className='w-6 h-6 p-1 rounded bg-zinc-900'
                             onCheckedChange={(cheked) => {
                                if (cheked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                             }}
                        >
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400 ' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz 😎
                    </label>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-700'>Cancelar</Dialog.Close>
                        <button
                            type="submit"
                            className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-700'
                        >
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}