import { useInstagramStore } from './store'

// const link = "https://www.instagram.com/p/CeNcSPaq9Vt/?utm_source=ig_embed&amp;utm_campaign=loading";

const div = {
  textAlign: 'center' as 'center',
}

const PlayView = () => {
  const link = useInstagramStore(state => state.link) + "/embed";
  return (
      <div style={div}>
        <iframe width="500" height="870" src={link} frameBorder="0" >
          <div style={div}>error 404</div>
        </iframe>
      </div>
  );

}
export default PlayView
