import React from 'react'

function getModeButtonClassName(modeId, selectedModeId) {
    return modeId === selectedModeId ? 'modeButton activeModeButton' : 'modeButton';
}

const GameModeSelector = ({ modes, selectedModeId, onChangeMode }) => {
    return (
        <section className="gameModeSelector" aria-label="Choose game mode">
            {
                modes.map((mode) => (
                    <button
                        key={mode.id}
                        type="button"
                        className={getModeButtonClassName(mode.id, selectedModeId)}
                        aria-pressed={mode.id === selectedModeId}
                        onClick={() => { onChangeMode(mode.id) }}>
                        <span>{mode.label}</span>
                        <small>{mode.winLength} in a row</small>
                    </button>
                ))
            }
        </section>
    )
}

export default GameModeSelector
