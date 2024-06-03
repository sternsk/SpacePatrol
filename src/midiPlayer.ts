import { Player } from 'midi-player-js';
import * as MIDIParser from 'midi-parser-js';

// Define the MidiEvent interface
interface MidiEvent {
    name: string;
    noteNumber?: number;
    duration?: number;
    // Add other properties based on the actual event structure
}

// Initialize the MIDI player
const player = new Player();

// Initialize AudioContext
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

// Function to create a 8-bit sound
function create8BitSound(frequency: number, duration: number) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

// Load a MIDI file
fetch('path/to/your/midi/file.mid')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        const parsed = MIDIParser.parse(buffer);
        player.loadArrayBuffer(buffer);
        player.play();
    })
    .catch(error => {
        console.error('Error loading MIDI file:', error);
    });

// Handle MIDI events
player.on('midiEvent', (event: MidiEvent) => {
    if (event.name === 'Note on' && event.noteNumber !== undefined && event.duration !== undefined) {
        const frequency = 440 * Math.pow(2, (event.noteNumber - 69) / 12);
        create8BitSound(frequency, event.duration / 1000);
    }
});

// Optional controls
document.getElementById('playButton')?.addEventListener('click', () => {
    player.play();
});

document.getElementById('pauseButton')?.addEventListener('click', () => {
    player.pause();
});

document.getElementById('stopButton')?.addEventListener('click', () => {
    player.stop();
});
