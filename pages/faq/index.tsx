/* eslint-disable react/no-children-prop */
import type { NextPage } from 'next'
import ReactMarkdown from 'react-markdown'

const FAQ: NextPage = () => {
  const md = `
## Allgemein

**Was ist re:quest?**

re:quest ist ein Open Source Framework zum Erstellen webbasierter "Quests" (im Stile von Escape Games), bei deren Lösung Programmier- und Datenkompetenzen – aber vor allem der Spaß gefördert wird. Entlang von Storys, werden Aufgaben gelöst, visuell programmiert oder Daten exploriert und analysiert. Das Einbinden von Social Media Kanälen und die Thematik der Storys/Rätsel (z.B. Klimawandel, Nachhaltigkeit oder Umwelt) sollen die Kinder, Jugendlichen und jungen Erwachsenen, die vielleicht genuin nicht an Coding oder Data Science interessiert sind, "abholen".

**An wen richtet sich re:quest?**

Bei der Zielgruppe unterscheiden wir zwischen den Ersteller\*innen und den Spieler\*innen der digitalen Escape Games. Außerschulische Bildungseinrichtungen wie Museen oder Schülerlabore können Quests erstellen und Kindern und Jugendlichen anbieten. Diese können am PC, Laptop, Tablet oder Smartphone interaktiv die Rätsel in den Abenteuern lösen.

**Wie kann re:quest genutzt werden?**

re:quest läuft vollständig im Browser. Es ist daher plattformunabhängig und muss nicht als App installiert werden. Sowohl das Erstellen der Quests als auch das Spielen kann mithilfe von modernen Webtechnologien vollständig im Browser geschehen. Neben online Komponenten sollen aber auch "offline Komponenten" aus der Umgebung der Spieler\*innen einbezogen werden, bspw. Gemälde, Skulpturen oder Landkarten.

**Welche Module gibt es in re:quest?**

Die Module beinhalten Rätsel zu verschiedenen Themen. Dabei beziehen wir uns besonders auf die "21st Century Skills" und fördern Daten- und Medienkompetenzen, analytisches Denken und physikalische Grundlagen.

**Kann man re:quest mit mehrere\*n Spieler\*innen nutzen?**

Gewisse Module können nur mit mehrere\*n Spieler\*innen gelöst werden, um Teamkompetenzen zu stärken. Man kann re:quests aber auch nur für eine\*n Spieler\*in entwickeln.

**Was bedeutet re:quest?**

"re:quest" ist angelehnt an unseren Firmennamen re:edu, "request": Client-Server Anfrage und "quest": suchen/forschen/rätseln.

**Wer entwickelt re:quest?**

re:quest wird von re:edu aus Münster entwickelt. re:edu ist ein Start-Up, das Lösungen für Bildung, Forschung, Nachhaltigkeit und Beteiligung - digital und offen - anbietet. 


## Für Bildungseinrichtungen

**Wie kann ich ein re:quest erstellen?**

Wir werden Konfigurationsseiten entwickeln, auf welchen man re:quests selbst erstellen kann. Dazu werden verschiedene Module angeboten, welche modular und individuell in Quests eingebunden werden können.

**Für welches Alter eignen sich re:quests?**

Grundsätzlich soll jede Person, unabhängig vom Alter, re:quests nutzen können. Der Schwierigkeitsgrad der re:quests hängt von den genutzten Modulen ab. Da gewisse Skills im Umgang mit dem PC, Laptop, Tablet oder Smartphone erforderlich sind, empfehlen wir ein Alter von mind. 10 Jahren.

**Was kostet re:quest?**

Für das Erstellen von re:quests sind 5 Basismodule kostenlos nutzbar. Um weitere Module nutzen zu können, muss eine Pro Lizenz erworben werden (Preismodell TBD...). 

**Wie kann ich mein re:quest individualisieren?**

Für die verschiedenen Module können eigene Texte eingetragen werden. Weiterhin stehen verschiedene Styles zur Verfügung, um das Aussehen thematisch an die Story anzupassen.

**Sitzen die Spieler\*innen dann nicht nur vor ihren Smartphones?**

Verschiedene Module bieten auch "offline" Rätsel an. Dabei müssen Spieler\*innen in ihrer Umgebung Dinge entdecken, Gemälde erkennen oder Informationen aus Postern oder Landkarten lesen. Damit verschmilzt im Abenteuer die echte Welt mit der virtuellen Welt. 


## Für Nutzer\*innen

**Wie kann ich ein re:quest spielen?**

Wähle ein re:quest aus der Galerie aus, um ein re:quest zu starten. Bildungseinrichtungen können außerdem QR-Codes für ihre re:quests erstellen, welche einfach mit dem Smartphone gescannt werden können.

**Was kostet re:quest?**

re:quest ist für Spieler\*innen kostenlos.


**Wie kann ich meine Erfolge festhalten?**

Hast du ein re:quest erfolgreich abgeschlossen, kannst du dir ein Badge von [myBadges](https://mybadges.org/) ausstellen lassen. Auf [myBadges](https://mybadges.org/) kannst du dir deine Badges anschauen und beispielsweise über Social Media teilen.`

  return (
    <div>
      <h1 className="p-2 text-center text-6xl font-bold">FAQs</h1>

      <ReactMarkdown
        children={md}
        components={{
          h2: ({ node, ...props }) => (
            <h2 className="my-8 text-2xl font-semibold" {...props} />
          ),
          p: ({ node, ...props }) => <h2 className="my-4" {...props} />,
        }}
      ></ReactMarkdown>
    </div>
  )
}

export default FAQ
