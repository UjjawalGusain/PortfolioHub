import React from 'react'

function CheckOut({project}) {
  return (
    <>
        <button
          className="fixed bottom-4 right-4 border-2 rounded px-5 py-2 bg-button-red hover:bg-home-white hover:border-button-red z-30"
          onClick={() => window.open(project.url, '_blank')}
        >
          Check out Repository
        </button>
    </>
  )
}

export default CheckOut