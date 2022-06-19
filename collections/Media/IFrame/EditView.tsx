import { useIframeStore } from '@/collections/Media/IFrame/store'
import { TextArea } from '@/components/Elements/FormElements/TextArea'
import {InputField} from "@/components/Elements/FormElements";
import {isArgumentElement} from "@formatjs/icu-messageformat-parser";

const EditView = () => {
  const link = useIframeStore(state => state.link);
  const width = useIframeStore(state => state.width);
  const height = useIframeStore(state => state.height);
  const setLink = useIframeStore(state => state.setLink);
  const setHeight = useIframeStore(state => state.setLink);
  const setWidth = useIframeStore(state => state.setLink);
  let changeLink = link;
  let changeWidth = width;
  let changeHeight = height;
  const tikTokFrame = document.getElementById("iframeID");

  return (
      <div>
        <TextArea
            label="Website URL"
            id="URL"
            defaultValue={link}
            onChange={(e) => {
                tikTokFrame && tikTokFrame.setAttribute("src", e.currentTarget.value);
                setLink(e.currentTarget.value);
                changeLink = e.currentTarget.value;
            }}
            rows={4}
        ></TextArea>

        <div>
            <InputField
                label={"Width"}
                type={'text'}
                placeholder={'100'}
                defaultValue={width}
                onChange={(e) => {
                    tikTokFrame && tikTokFrame.setAttribute("width", e.currentTarget.value);
                    setWidth(e.currentTarget.value);
                    changeWidth = e.currentTarget.value;
                }}
            />

            <InputField
                label={"Height"}
                type={'text'}
                placeholder={'500'}
                defaultValue={height}
                onChange={(e) => {
                    tikTokFrame && tikTokFrame.setAttribute("height", e.currentTarget.value);
                    setHeight(e.currentTarget.value);
                    changeHeight = e.currentTarget.value;
                }}
            />
        </div>
          <iframe
          id = "iframeID"
          className="relative w-full overflow-hidden pr-12"
          width={ "100%"}
          height={"500"}>

          </iframe>

      </div>

  )
}

export default EditView
