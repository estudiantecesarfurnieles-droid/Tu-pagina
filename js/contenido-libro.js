// Contenido del libro "Nuestra Historia" - 50 páginas
const contenidoLibro = [
  // Páginas 3-6: Capítulo 1 - El Primer Encuentro
  {
    titulo: "Capítulo 1: El Primer Encuentro",
    autor: "Camilo - Bebé Koalita",
    contenido: "Todo comenzó en pandemia cuando yo prestaba un salón de la institución de Río Nuevo para dar las clases virtuales, que es el pueblo donde vive mi actual novia (Milagros). Ella en ese entonces se acercaba con sus amigas a hacer trabajos, supuestamente, pero después me comentó que lo hacía solo porque le llamó la atención y quería saber más de quién era yo."
  },
  {
    titulo: "Capítulo 1: El Primer Encuentro (cont.)",
    autor: "Camilo - Bebé Koalita", 
    contenido: "Pasaron los días y yo seguí llegando. También es bueno aclarar que yo en ese entonces tenía novia, la cual llegaba de vez en cuando a hablar conmigo un rato y luego se iba. Milagros me comenta que un día vio que ella llegó, se acercó a mí y me besó, y se dio cuenta de que tenía novia; se sintió un poco extraña."
  },
  {
    titulo: "Capítulo 1: El Primer Encuentro (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, pasaron los días y yo seguí yendo a dar las clases, y recuerdo que Milagros, cuando yo ya iba saliendo de la institución, estaba cerrando una puerta de un salón, pero no podía, así que me pidió el favor de ayudarla. Ahora, en la actualidad, me comenta que ella hizo eso en ese entonces solo para acercarse un poco a mí y hablarme."
  },
  {
    titulo: "Capítulo 1: El Primer Encuentro (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Pero en ese entonces, como yo estaba enamorado de la que era mi novia, no me di cuenta de que Milagros llegaba solo para verme porque le llamaba la atención. También me dijo lo de la puerta solo para acercarse a mí."
  },
  // Páginas 7-10: Capítulo 2 - Las Primeras Conversaciones
  {
    titulo: "Capítulo 2: Las Primeras Conversaciones",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, pasó el tiempo y sucedió que ella me envía la solicitud por Facebook, pero resulta que después de eso yo dejé de ir a dar las clases a la institución porque una prima de la que era mi novia en ese entonces me dijo que en su casa había wifi y que si quería podía dar las clases allá para estar más cómodo y más tranquilo, y dije que sí."
  },
  {
    titulo: "Capítulo 2: Las Primeras Conversaciones (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Por otra parte, Milagros un día me escribe por Facebook \"Hola\". Yo, un poco sorprendido, le contesté \"hol\" también y seguimos la conversación normal, sin ninguna intención de conquista ni nada, solo como amigos, pues así lo veía yo porque respetaba a mi novia."
  },
  {
    titulo: "Capítulo 2: Las Primeras Conversaciones (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, las conversaciones con Milagros siguieron y nos fuimos haciendo buenos amigos. Llegamos a tener bastante confianza muy rápido. Nos dimos cuenta de que éramos personas bastante similares, más que todo por las distintas situaciones por las que habíamos pasado, ya sea con nuestras familias o nuestra personalidad."
  },
  {
    titulo: "Capítulo 2: Las Primeras Conversaciones (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Pasó un año y tuve unos problemas con mi novia y terminamos. Como cualquier persona, me sentía mal, estaba pasando por malos ratos, no sentía ganas de hacer nada, algunas veces ni de comer. Total, que Milagros me preguntaba qué me pasaba. Le comenté la situación y todo. Debo decir que ella me escuchó y me sentía bastante bien hablando con ella."
  },
  // Páginas 11-15: Capítulo 3 - El Apoyo Mutuo
  {
    titulo: "Capítulo 3: El Apoyo Mutuo",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, después de la ruptura con mi novia me entero de que Milagros tiene novio. Pues lo tomé normal porque en ese entonces mis intenciones con ella solo eran de ser amigos y nada más. Incluso su novio era un chico que vivía cerca de mi casa; con él tenía un trato normal, jugábamos fútbol, la recocha y no más de ahí."
  },
  {
    titulo: "Capítulo 3: El Apoyo Mutuo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, siguieron pasando los días y seguía hablando más con Milagros hasta el punto de que despertó en mí un interés más allá de amistad, pero recordé que tenía novio, entonces no había nada que hacer. Al igual, yo seguí hablando con ella y esas conversaciones se hicieron cada vez, y cada vez, más largas."
  },
  {
    titulo: "Capítulo 3: El Apoyo Mutuo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Pasaba que ella en ese entonces estaba teniendo problemas con su familia y también problemas con cosas que le habían pasado cuando era niña. Yo decidí preguntarle qué pasaba y ella me comentó algunas cosas que le estaban ocurriendo con su familia y cosas del pasado que aún llevaba en la mente."
  },
  {
    titulo: "Capítulo 3: El Apoyo Mutuo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Cabe aclarar que ella vive, y vivía en ese entonces, en casa de sus abuelos con sus dos hermanos y su mamá. Familia que es bastante reconocida en su pueblo y familia que es bastante estricta con su reputación en cuanto a lo que se dice de ellos y todo."
  },
  {
    titulo: "Capítulo 3: El Apoyo Mutuo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, yo decidí escucharla, estar para ella y darle unos consejos, y nuestra confianza aumentó aún más. Después de un año ella me comenta que había terminado con el novio. También pasó por unos malos ratos y todo. Siempre estuve para apoyarla y escucharla."
  },
  // Páginas 16-20: Capítulo 4 - La Confesión
  {
    titulo: "Capítulo 4: La Confesión",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, pasaron varios meses y la conexión entre ella y yo se notaba a leguas, y me empecé a dar cuenta de que ya no la veía con ojos de amistad. Por la forma en la que me hablaba también me di cuenta de que ella me miraba igual."
  },
  {
    titulo: "Capítulo 4: La Confesión (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Recuerdo que en ese entonces unos amigos y yo nos íbamos en las noches a jugar fútbol con los chicos del pueblo de ella. Bueno, ahí llegaban muchas personas a vernos y disfrutábamos mucho de jugar con nuestros compañeros. Fue una noche cuando ella estaba hablando conmigo y me dice que tiene que decirme algo."
  },
  {
    titulo: "Capítulo 4: La Confesión (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Total, yo ese día me estaba cambiando porque esa noche iba con mi amigo a ver jugar a las chicas, porque nos turnábamos: un día los chicos, otro día las chicas. Y, por supuesto, yo solo iba porque ella jugaba también y quería verla jugar."
  },
  {
    titulo: "Capítulo 4: La Confesión (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Total, que cuando llegué parqueé la moto en la entrada y me senté en una grama que está enfrente de la entrada a esperar que llegaran las chicas a jugar. En un momento de eso miro mi teléfono y veo un mensaje de Milagros donde dice: \"Lo que tengo para decirte es que me gustas\". Ya se pueden imaginar la cara de emoción que tenía cuando vi el mensaje, porque yo también sentía lo mismo hacia ella."
  },
  {
    titulo: "Capítulo 4: La Confesión (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Total, que emocionado esperé que ella viniera. Pasó un rato y ella llegó con su combo de amigas. También entré y me senté en unas bancas. Cuando miro hacia mi izquierda veo que está ella con todos sus amigos, los cuales nos ayudaron también, porque me señalaban que la esperara afuera para que no hubiera alguien que sospechara que nosotros queríamos tener algo."
  },
  // Páginas 21-25: Capítulo 5 - El Juego del Amor
  {
    titulo: "Capítulo 5: El Juego del Amor",
    autor: "Camilo - Bebé Koalita",
    contenido: "Porque, como te comenté anteriormente, su familia es y era bastante complicada y su mamá no la dejaba tener novio, entonces decidimos hacerlo así, de tal manera que nadie se diera cuenta."
  },
  {
    titulo: "Capítulo 5: El Juego del Amor (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, yo salí y me senté en la grama donde estaba antes. Al rato llegó ella y ambos estábamos bastante nerviosos, no queríamos ni vernos a la cara, pero en una de esas ella me dice: \"Lo que te escribí es verdad, es realmente lo que siento: tú me gustas\". Fue cuando le dije que también sentía lo mismo."
  },
  {
    titulo: "Capítulo 5: El Juego del Amor (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, decidimos sentarnos en la grama y hablar un rato. En ese momento me acordé de que por mensaje yo le había escrito que quería jugar algún día con ella \"Piedra, papel o me besas\". Que si yo ganaba, ella tenía que darme un beso, y si ella ganaba, me daba una cachetada. Bueno, le recordé eso y me dijo: \"Bueno, está bien, juguemos\"."
  },
  {
    titulo: "Capítulo 5: El Juego del Amor (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Debo decir que ella me ganó más veces de las que yo a ella, pero fueron varios besos los que pude darle y no sabes lo feliz que me sentí. Bueno, después de un rato de juego me dijo que ya se tenía que ir, que la acompañara a su casa."
  },
  {
    titulo: "Capítulo 5: El Juego del Amor (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Yo, bastante sorprendido, porque sabía que su familia era bastante complicada y de pronto que me vieran pasar con ella me causó un poco de miedo, pero igual la acompañé. Llegando a su casa me doy cuenta de que estaban casi todos sus familiares afuera de sus casas reunidos hablando, pero solo la llevé a su casa y me regresé lo más rápido que pude."
  },
  // Páginas 26-30: Capítulo 6 - El Paseo al Pozo
  {
    titulo: "Capítulo 6: El Paseo al Pozo",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, al día siguiente me escribe y me dice que pasó un rato muy agradable conmigo. También le dije que me la había pasado súper. Pasó el tiempo y ya nuestras conversaciones no eran de amigos, sino de algo más. Cada día disfrutaba hablar con ella, aunque era por mensaje, sentía cada palabra y cada letra como si ella estuviera diciéndomela al oído."
  },
  {
    titulo: "Capítulo 6: El Paseo al Pozo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, pasaron los días y las semanas. En uno de esos, ella me comenta que sus amigos van a hacer un paseo a un pozo muy popular por allá donde nosotros vivimos, en el cual las personas se van a bañar y disfrutan la paz y la tranquilidad del sonido de las aves y el bosque. Bueno, ella me dijo que si quería ir con ella y obviamente le dije que sí."
  },
  {
    titulo: "Capítulo 6: El Paseo al Pozo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, se planeó todo para que nadie sospechara que yo iba para allá. Bueno, pasó todo, yo fui con ella y sus amigos se vieron sorprendidos porque tampoco sabían que yo estaría en ese paseo. Total, que fui y la pasamos súper."
  },
  {
    titulo: "Capítulo 6: El Paseo al Pozo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "También recuerdo que una de sus amigas se le da la grandiosa idea de hacer un juego de verdad o reto. El juego consistía en que escogían a una persona y le preguntaban si verdad o reto, y la persona escogía, y si escogía reto, la retaban a hacer cualquier cosa que ellos dijeran."
  },
  {
    titulo: "Capítulo 6: El Paseo al Pozo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, resulta que ya todos habían dicho sus verdades y algunos escogían retos, hacían lo que les colocaban. En una de esas su amiga la señala y le dice: \"Milagros, ¿verdad o reto?\". Y ella dijo reto. Fue cuando su amiga la retó a que me diera un beso."
  },
  // Páginas 31-35: Capítulo 7 - Nuestro Lugar Secreto
  {
    titulo: "Capítulo 6: El Paseo al Pozo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Yo disimulando la felicidad, jajajaja, pero igual ella lo hizo, aunque estaba bastante nerviosa e incómoda porque darme un beso frente a sus amigos era bastante obvio el nervio y la incomodidad. Bueno, también me sentí bastante incómodo al ver cómo todos nos miraban, pero igual fue un momento que quedó marcado en mi mente."
  },
  {
    titulo: "Capítulo 6: El Paseo al Pozo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Luego que pasó todo lo del beso, nos fuimos a la cima de una pequeña superficie y, junto con sus amigos, nos tomamos una foto, foto que aún conservo en mi teléfono. Bueno, ya se terminó el paseo y de camino a casa seguimos hablando y divirtiéndonos con las locuras que hicimos."
  },
  {
    titulo: "Capítulo 6: El Paseo al Pozo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Para llegar al pueblo de ella teníamos que cruzar una barca, la cual estaba dañada, y bueno, eso fue un total despelote para cruzar al puerto del otro lado."
  },
  {
    titulo: "Capítulo 6: El Paseo al Pozo (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "También recuerdo que cuando cruzamos nos quedamos viendo el puerto y vimos que era un lugar bastante solo y tranquilo. Fue cuando le dije: \"Este puerto se puede convertir en nuestro lugar de encuentro\". Ella, feliz y sonriendo, me dice que sí, que le gustaría que ese se convirtiera en nuestro lugar de encuentro."
  },
  {
    titulo: "Capítulo 7: Nuestro Lugar Secreto",
    autor: "Camilo - Bebé Koalita",
    contenido: "Bueno, pasaron los días y seguíamos hablando y disfrutando de nuestras conversaciones. En una noche que yo estaba en su pueblo dando clases, cuando terminé, llegó un pensamiento a mi mente de decirle que si podía llegar a nuestro lugar de encuentro para hablar un rato, y ella me respondió que haría lo posible por ir."
  },
  // Páginas 36-40: Capítulo 8 - Reflexiones del Amor
  {
    titulo: "Capítulo 7: Nuestro Lugar Secreto (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Y así fue. Ya cuando terminé la clase, antes de irme para mi casa, le escribo y le digo: \"Ya terminé la clase, ¿si vas a venir?\". Y ella me dice que sí, que iba con una amiga para que su mamá no sospechara nada. Y fue así que yo la esperé en el puerto."
  },
  {
    titulo: "Capítulo 7: Nuestro Lugar Secreto (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Al rato llegó y lo primero que hice fue abrazarla. Luego me dice que se había inventado que iba a hacer un mandado con su amiga solo para venirse a ver conmigo. Total, que ella me abrazó también muy fuerte y me besó, y disfrutamos juntos de ese hermoso momento en el que nos sentíamos tan felices y seguros que no queríamos que terminara nunca."
  },
  {
    titulo: "Capítulo 8: Reflexiones del Amor",
    autor: "Camilo - Bebé Koalita",
    contenido: "Ha pasado mucho el tiempo. Hoy 24 de abril de 2024 nos encontramos llenos de vida y de salud, con tropiezos, pero con la esperanza de que todo estará bien. Han pasado 3 años desde ese primer día que jugamos \"piedra, papel o me besas\"."
  },
  {
    titulo: "Capítulo 8: Reflexiones del Amor (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Hemos pasado por muchas situaciones en las que decimos \"¿Y ahora qué? ¿Qué hacemos?\". Cabe resaltar que no solo han pasado momentos desagradables. Debo resaltar que cada momento en el que pasamos juntos es tan único que cada momento es mejor que el anterior."
  },
  {
    titulo: "Capítulo 8: Reflexiones del Amor (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "He podido deducir que las cosas malas que nos han pasado, y a veces decimos que es culpa \"tuya\", son situaciones en las que nos pone Dios para hacernos más fuertes. Él sabe que, aunque pasen miles de cosas malas, nosotros vamos a tener las ganas de seguir, y cada vez nos volvemos más fuertes."
  },
  // Páginas 41-45: Capítulo 9 - El Día de la Puerta (Yulianis)
  {
    titulo: "Capítulo 8: Reflexiones del Amor (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "He podido deducir que Él tiene algo maravilloso para con nosotros y nosotros somos los que decidimos si tomarlo o dejarlo."
  },
  {
    titulo: "Capítulo 8: Reflexiones del Amor (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Estando en nuestra relación he visto que pocos son los que quieren verte feliz. Tal vez te pueden decir: \"Me alegra que estén juntos\" o \"¡Qué lindos!\", pero más adelante nos dan la apuñalada por la espalda. Tal vez podemos decir que son muy pocos los que en verdad nos quieren ver juntos, pero lo que es importante es que hemos visto quiénes son tus \"amigos\"."
  },
  {
    titulo: "Capítulo 8: Reflexiones del Amor (cont.)",
    autor: "Camilo - Bebé Koalita",
    contenido: "Aunque para eso debes equivocarte muchas veces, pero al final dirás: \"Aunque no fue fácil, pude saber quién eres en realidad\". O así lo pude ver yo, Yulianis Beltrán, novia de mi Bebe Chititito <3."
  },
  {
    titulo: "Capítulo 9: El Día de la Puerta",
    autor: "Yulianis - Cachetitos",
    contenido: "Todavía recuerdo ese día en que te vi por primera vez, ¡JAJAJAJA! El famoso \"día de la puerta\" que yo no podía abrir. Ese mismo día me animé a escribirte y confesarte que me gustabas. Estaba con una amiga (que ya no lo es), y me dijo: \"Milagros, tú estás muy loca\". Pero no me importó, porque era la primera vez que me arriesgaba de esa manera, sin pensar en lo que podía decir mi familia."
  },
  {
    titulo: "Capítulo 9: El Día de la Puerta (cont.)",
    autor: "Yulianis - Cachetitos",
    contenido: "Yo estaba nerviosa, a punto de verme cara a cara contigo, y cuando te vi de lejos, solo quería que la tierra me tragara y me escupiera en cualquier lugar… ¡menos cerca de ti! Porque tú me ponías demasiado nerviosa."
  },
  // Páginas 46-50: Capítulo 10 - Momentos Inolvidables
  {
    titulo: "Capítulo 9: El Día de la Puerta (cont.)",
    autor: "Yulianis - Cachetitos",
    contenido: "Y entonces, sin pensarlo mucho, te solté un: \"Tú me gustas\". Lo mejor fue que me respondiste que tú también sentías lo mismo… y ¡pum! Me agarraste de la cintura y me besaste. Ese momento quedó grabado en mí para siempre."
  },
  {
    titulo: "Capítulo 9: El Día de la Puerta (cont.)",
    autor: "Yulianis - Cachetitos",
    contenido: "Después vino el día en que te invité a un paseo con mis amigos. Jugamos verdad o reto, y yo estaba superincómoda porque casi nadie sabía que estábamos juntos. Ellos, como siempre, me hacían pasar penas, pero igual disfruté cada instante."
  },
  {
    titulo: "Capítulo 9: El Día de la Puerta (cont.)",
    autor: "Yulianis - Cachetitos",
    contenido: "Y el regreso a casa… uff, sin duda fue el mejor. Todo el camino lo pasamos hablando y jugando, y no quería que terminara nunca."
  },
  {
    titulo: "Capítulo 10: Momentos Inolvidables",
    autor: "Yulianis - Cachetitos",
    contenido: "También recuerdo cuando fui a visitarte con una amiga. Tu mami, tan hermosa, nos ofreció jugo. Yo estaba tan nerviosa que casi dejo caer el vaso porque me temblaban las manos y las piernas. ¡JAJAJAJA!"
  },
  {
    titulo: "Capítulo 10: Momentos Inolvidables (cont.)",
    autor: "Yulianis - Cachetitos",
    contenido: "El primer regalo que me diste fue una manilla, que aún conservo con mucho cariño. Ese día me fui tan feliz. Y ni hablar de nuestro lugar secreto de encuentros, donde siempre alguien tenía que vigilar para que no nos descubrieran. ¡Qué susticos pasábamos! JAJAJA."
  }
];





