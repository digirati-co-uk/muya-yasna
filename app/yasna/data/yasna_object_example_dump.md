example dump of FrameRangeId

[
  {
    "model": "yasna.framerangeidtemp",
    "pk": 0,
    "fields": {
      "frames": "{\"bounds\": \"[)\", \"lower\": \"1\", \"upper\": \"18\"}",
      "temporal": null
    }
  },
  {
    "model": "yasna.framerangeidtemp",
    "pk": 1000000,
    "fields": {
      "frames": "{\"bounds\": \"[)\", \"lower\": \"1\", \"upper\": \"90176\"}",
      "temporal": "{\"bounds\": \"[)\", \"lower\": \"1970-01-01T00:00:00+00:00\", \"upper\": \"1970-01-01T01:00:07+00:00\"}"
    }
  }
]


example data dump of YasnaObjectImage

[
  {
    "model": "yasna.yasnaobjectimage",
    "pk": 1,
    "fields": {
      "yasna_object": 1,
      "image": "yasna_object_images/1_0.png"
    }
  }
]


example data dump of related YasnaObjects

[
  {
    "model": "yasna.yasnaobject",
    "pk": 1,
    "fields": {
      "created": "2021-06-02T15:05:05.873Z",
      "modified": "2021-06-02T15:06:24.913Z",
      "label": "Assistant Priest",
      "name_in_avestan": "",
      "name_in_middle_persian": "<i>rāspīg</i>. The MP word <i>rāspīg</i> possibly derives via *<i>rā̆θβīg</i> from *<i>rā̆θβiiaka</i>-, a derivative with suffix -<i>ka</i>- from the adj. *<i>rā̆θβiia</i>- ‘belonging to the (right) time’ (Panaino 2020 191f.). The word is then formed on the basis of the noun <i>ratu</i>- ‘(right) time’, whose Vedic cognate <i>r̥tú</i>- ‘(right) time’ constitutes the first term of the compound <i>r̥tvíj</i>-, a priestly title meaning ‘who sacrifices at the (right) time; priest of the sacrifice’.",
      "name_in_gujarati": "rāthvī",
      "translation": "Assistant Priest",
      "definition": "Title of the second, assistant ritual expert participating in the ritual.",
      "description_of_action": "The assistant priest assists the chief priest (<i>zōt</i>) in performing the ceremony. He carries out the preparatory rite (<i>paragṇā</i>) in which he milks the goat, cuts the pomegranate and palm tree leaves, and prepares the Parāhōm. His duties during the main ceremony include keeping the ritual fire burning by feeding it with sandalwood and frankincense and reciting some of the prayers together with the chief priest.",
      "function": "The rāspīg performs the Paragnā ceremony, which is preparatory to the main ritual, and functions as the assistant to the chief priest, the zōt, during the Yasna proper.",
      "where_during_ritual": "The assistant priest is present throughout the Yasna ritual.",
      "interpretation": "Two priests, the chief priest (zōt) and the assistant priest (rāspīg) are required for the Yasna ceremony. Scholars debate whether this was so also in Old Iranian times or whether the number of priests was reduced to two from originally eight priests, as was the case in the Visperad ceremony.",
      "references": "Kotwal, Firoze M. 2017. An Overview of the History and Development of the Parsi Priesthood in India up to the 19th Century. Dabir 1:3, 67–87. Panaino, Antonio 2020. Le collège sacerdotal avestique et ses dieux. Aux origines indo-iraniennes d’une tradition mimétique (Mythologia Indo-Iranica, II). Paris: École Pratique des Hautes Études, 189–200.",
      "comments": "In the MUYA film, Ervad Asphandiarji Dadachanji of the Vacha Gandhi Agiary, Mumbai, performs as Assistant Priest.",
      "cross_references": [
        5
      ]
    }
  },
  {
    "model": "yasna.yasnaobject",
    "pk": 5,
    "fields": {
      "created": "2021-06-02T15:05:19.332Z",
      "modified": "2021-06-02T15:06:10.283Z",
      "label": "Chief priest",
      "name_in_avestan": "",
      "name_in_middle_persian": "asdf",
      "name_in_gujarati": "asdf",
      "translation": "asdf",
      "definition": "asdf",
      "description_of_action": "asdf",
      "function": "asdf",
      "where_during_ritual": "asdf",
      "interpretation": "asdf",
      "references": "asdf",
      "comments": "asdf",
      "cross_references": [
        1
      ]
    }
  }
]
