import Script from 'next/script'
import { useInstagramStore } from './store'

// const link = "https://www.instagram.com/p/CeNcSPaq9Vt/?utm_source=ig_embed&amp;utm_campaign=loading";

const blockquoteStyle = {
    background: '#fff',
    border: '0',
    borderRadius: '3px',
    boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 10px 0 rgba(0, 0, 0, 0.15)',
    margin: '1px',
    maxWidth: '540px',
    minWidth: '326px',
    padding: '0',
    width: '99.375%',

};

const div = {
    color: '#100e0e',
    fontFamily: 'Arial, sans-serif',
    textAlign: "center" as "center",
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '550',
    lineHeight: '18px',
}



const PlayView = () => {
  const link = useInstagramStore(state => state.link)
  const scriptSrc = "http://www.instagram.com/embed.js"
  return(
        <div>
            <blockquote
                className="instagram-media"
                data-instgrm-permalink={link}
                data-instgrm-version="14"
                style={blockquoteStyle}
                >
                <div
                    style={div}
                >
                    error 404
                </div>
            </ blockquote>
            <Script src={scriptSrc}></Script>
        </div>
  )
}

export default PlayView
