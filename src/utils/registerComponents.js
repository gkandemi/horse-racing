import Heading from '../components/common/Heading.vue'
import AppTable from '../components/common/AppTable.vue'
import AppHeader from '../components/common/AppHeader.vue'
import AppIcon from '../components/common/AppIcon.vue'
import AppButton from "../components/common/AppButton.vue";

export default function (app){
  app.component("Heading", Heading)
  app.component("AppTable", AppTable)
  app.component("AppHeader", AppHeader)
  app.component("AppIcon", AppIcon)
  app.component("AppButton", AppButton)
}
