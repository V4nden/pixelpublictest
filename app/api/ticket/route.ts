import { pb } from "@/src/app/pocketbase";
import { createTicketPlay } from "@/src/entities/Ticket/api/createTicketPlay";
import { getTicketPlayByDiscord } from "@/src/entities/Ticket/api/getTicketPlayByDiscord";
import fs from "fs/promises";
import { getServerSession } from "next-auth";
export async function POST(req: Request) {
  const words =
    `абазу агава агавы агато агент агнца айвой акима акиму аккур актах актом акына акыну алгол алело аллах алчбе амебе амиды анеля аннот аноду анфим апекс араба ардал ареал арефа ариец аркам арках армия архип аскет аулам аулах аулом аурат афера ахнем бабок багря балка балык банки банно банту барде барич барок баром барса батик бахче бахчи бачку бдело бегло бёдер бедна бедре безде бездн белей белец белке белог белуг бемит берёт бесил бетон бетхо бигус бизон билет бином бинта бирки битые блага блесн блефу блику блины блога блоге блуда блудя бобок бобчи богач бодам бодра бодре бойцы бокам боксе болит бомбе бомби бонды бонну борту босяк ботом бочут боями брака брако браку брама брела брело брику брому броси брусу бубли бугае бугре бугря будит будут буйка букля булла булле бунах бурат бурим бурку бурой бурок бурсы бурте бурум бурым бухте буяне бывая бяках вагой вагон валет валин варва варил варит варке ватер вбива ввали ввезя ввели вводу вдула ведам вёдер ведой везём везло вейсе велии велся венду венед венцу верим верит верно верой веску весне вётел ветхо веяли взбес взбил взвыл вздер взята видал видат видно визам вилам виллу винах винтя виолы вирус висле витик витка витое витым влаги влады власы влива влили влияй вмёрз вмяло вмято внеся вносе внося вняло вогна вогну вогул водах водке водно возка возла возяс волов вопил вотку впаду враки врача вредя вруну всегд вскри вспух вспых вузам вузом въеха выбыв выбыл вывел вывес выгля выгод выдох выдув выздо вызол выкат вымок вымыл вынуд выпря вырва вырез вырос высев высек высот вятск гагар гадах гадов гадом гаере газах газуй гайда галит гамбе гамбу ганау ганну ганны гатях гдето гелем гелям гемме генам гения геоид геол. гербе гербы герои гибни гибок гибче гиках гинув гисар гитов гитом глета глина глипт глифе гнево гнета гнием гнусу говну годах годен годку голое голых гонад гоном гонту горбы горим горла горча гофре граби грабу грамм графи граци грезу грезя греке грехе гречн грзая гриле грипа грифе грозе громк громч груде груме груму грумы грунт групп гряда гряну губим гудел гудит гудку гузки гукая гулак гулки гулко гуляй гумна гунны гурты густи гусям даете дайку далях дании дацит дачах двину двумя дебри дегти деист деках делат делец делим денек дения депар дерби дёрне десну дзеты дикой динам динар диста длили длине длины добре добры довер догов доеду доело дозах дозой дойки дойму долга долит долот домам донес донёс донов допру допус допыт досол досту дофин дочек дояра драге драпы дроби дроги дрона дрофа другу дряни дубли дубом дукат дулях думке думки думцы дунут дурит дурна дутой дутые дутым дымку дырке дядин евген еврея евсее едине единс ездку ездры ездят ёкает екнем ёкнут елеем елена ёмкие емким емком енигм еноле енолу еноха ереси ерник ефтом забог забол завел завёл завет завоп загор задач заезд зайдя займа займе залег залом замер замки замыв заним заной заняв запад запев запек запис запру запут засед застр засту затку затми затру зачёл зачес зачин зачла зачну зачту звала звезд звене звуко здоро зенки зенок зерка злите злоде злото змеек змием знала знамо значу зноен зобах золям зоман зонты зрела зримо зримы зряче зубил зубка зыбуч зыбче зябла зябли ивану ивняк иглах играм идете идиот изгиб издам измял измят изъяв изыми иконы икрой иксам иксом иксор инока иомен искам испис испол истая истец исток итала йенец йогов йорке кабил кавал кагал кагат кагор кадит кадры каина кайты калач калом калят камеи камея камке камча канва канву капот карай карая карги каргу карры катом катят каури квасу кедах кедов кедра кедру кейсу кейфа кексе керну кзади кивку кивни кивок кидал килей килек килях кинин киота кипой кирхе кисну кисой китам кичка кладя клали клару клеим клерк клину клиру кляня книга кнопе кобзе ковер ковке ковна когда кодак кодом кокка колес колле колот комки комми коммы комор конах конек контр конца копах копие копии копка копне копру корот корре косец косце косцы котле котов котяр кохия кочан крага краем кране креди крепа крепо кресл крива крипу крицу кровн крота круги кругу крыга крыле крыму кубке кубки кузек кулан кумол купой купце курсу кусай кусов куток кухар кухва кухне куцее кучка кхмер лавой лагом ладен ладно лазим лайбу лайся лампе лапал лапах ласко латка лафет лгуна лгуне левак левый ледве ледка ледку лембк леноч ленчи лепех лерки леске лесом летал летни лёток ливре лидия лизин лимбу лимон лингв линка линку липка липли липой лисам лисов литое литре лицах лицея лобия ловко лозен локтя ломай ломам лорис лосях лотом лудил лудим лузам лузах лузгу луизе лунно лучам лучем лучим лучку лысин лысый лычко лядом лязге лямке ляпай ляпну магий мазло майке майки макам малая мален малые малых мамах мание манко марал марке марфа марфо маски масон маточ медея медли медно мезон мелем менад мерах мерой мерял место месту метал метим метки метле метни метче миазм мигах мигну мигом мизер микоз микст мимом миней минея мирам мирты мифах михея млрд. мните мозгл мойка мокка мокор молят монот мопсе мопсу морги морем мороз морфы морях мосте мотку мочки мудро музах мукой мулах мумер мунди мурзы мурин мусор муссу мутят муцин мучат мучая мысах мыски мытым мычки мякла мялку мяска мяску мятым мячем набил наблы навет навра нагиб нагля нагни надои надса надтр надул наезд наела назва назем након налоя намек намел намер наниз нанка нанки нарву нарыл науки нафта нахло наций начне негод недов незав нейди некий нелли немку ненцы неопр нерпы нерях неспр нетто нехри нивам низов нимба нница новой новый ногти нонче норке носке носом носух ночей ночке нудим нулей нырял обаял обвёл обдум обида обиде обидч обиды обкос облет облёт облик облоя обогн обоях обрет оброн обтёк обуем обузе обузу обухи овале овеян овило овито оводе овцам овцах оглох огляд огнем оград огрех озими ойкал окает окала окном окоем около окоту октод окуни окуня олеси олифу омара омару омегу омочи омуту омыли омыты опием опило описа оплот оплыл опоек опоен опомн оптим опуст ордам орите осади освоб осела осина осине осины ослов осмел особл осоед остал отара отбит отбро отбыв отбыт отвёз отвёл отвес отвоз отгиб отели отира откло отлёт отлич отнёс отнын отпал отпел отпус оттер отчим отъяв отыде офици офсет охрил очаги очини очном очные пабов пабом падат падут пазке пайке пакта пакты пакуя палач палке палой палые памбы пампа панды папах пардо парко парту пасси пасти пасхи патер пауко пафос пахли паяет паяце пеана пегим пегом пёкся пекто пенёк пенно перва перга перил пёрло перми пером пёсий пёсик песку песца пехом печал пиита пикну пилку пимам пимах пиону пирам пиром питая плакс плане плаха плахт плиты пломб плуге плуги плыла плясе побег побои повал повея погиб погни погре погру подат подко подни подро подря подсл позад позов пойди пойма пойми полёт ползи полко полку полну полус получ полча полым помех помну помог помоч поняв пообе поори попав попал попод порте порто поруч посвя посев посет послы посме потир потон поход похор похул почёт почли почти почту почув поясн права правы пребы преде предл предо преет привс придт приля приме приму прини пробе пробу прода проел проло проро прохо пруту псков птахе пугач пудри пудры пузат пулом пурку пустя путля путях пучки пчела пылай пылая пылки пытка пялке пялку пятая рабий рабой радуй разди раздо разли разлу ракет рамир рамно рамой ранах ранге ранку расам расин распо ратей раунд раута рауту рацея рачки рвали рвете рвоты рдест ревет ревут регги регул редак редея редки резей резки резко резне рейса рения репер репет репке ресно реяло реями риалу рингу рисом рифмы робой робот робче ровне рогах рогач родей родий родно родст родят розги розов розой ролей ролям ролях ромео рондо ропот россо росче ротах ротор рохли рубая рубка рубке рудам рудой рукам рулим рулях рунцы русте рыбиц рыкну рында рынку рысий рысца рысят рябит рябое рябые рядов рясам савич савла садис садит садня садов сайге сайду сайке саква сакле салун самоё самой самом санда саран сачки сбита сбоев сбоям сбоят сбред сбрил сброд сбыто сваей свана свара своея свойс своре святы сдано сдаст севас севка седло седой седом седые секса секте семга сёмга семги сёмгу семен семна сенцы сепий сереб серии серий серый сетях сечем сечки сеяны сивке сивые сигар сидит сикху силён силка силос синдх сипну систр ската скачу сквер скиду скины скифа скифу склян скоба скобы скора скотт скотч скрап скрёб скром скуёт скуля сладк слайд следс следу следя слете сливу слила сличи слому слугу слухе слухи слягу смело смета смеха смеяс смотр смуте смыва смыто смягч смято снима сносе согни созыв сойки сойти соках солка соляр сомах сонма сонце сопел сорва сорву сотки сотой сотри софии софия софта сохло сочло сочна сочни сочня спаму спаяй спаях спёрт спины спицу спичк споры спочи спрос сраме средс среду става стало сталы стана стани ствол створ степа стили стирк стихо стлал стога стоне стони стопе сторо стрий судки судну судор сулей сумой сумок сунду супах сурах сурна сусло сучий сучке сфере сходе сходу сцеди счесу счёсу съёме сырах сырку сырце сысой сытое сытых сычах сякой табун тагал тазом тайны таксы талес талые танец танки тапку тасуя тафта тафту тахты тацит таяла твоег твоем твори театр тезке тёзок теина теине текут телку тёмен тёмно темпу терем терза терке терла терло тёрло терра теряй теска тёска тески тесом тётей тетки тетях тиару тигре тиров титла титлу титом тихий тихом ткёте ткнет тлело тлене токае толче тонее тонем тонен тонул тонут торга торит торфу торчу тосту тотем трава транс трапу трасс тратя требу трево трефы трибе трибы триех троки трону тросы трубе труди трусу труте тряси тугай тугая тузом тучам тыкай тыкал тыква тылах тырса тычет уазик убери убира убиты убого убоев убрат убуду уведи увезл увиты увози угаси углях угоду угрях удавл удели удина удода удоды удрав уедин уедят уезду узине узины узкий узлов укала уколи укусы улёте улёту улице умани умере умнея умолк умоля уморе уморы умчит умыла умыли умято унаби уничт уноса унося унтом упаст упёрт уплел упоен упоре упраз уране урану уроду усеку усику уснув устно устои утвер утеря утиле уткну утлая утону утяни утяну уходе учеба учёбе учены учтён учтив факте фарси фарте фасуя фатам фатер фации фаций федор фелон фенов феном ферми ферта филер филия финне финте фитам флане флоту фляга фомку фоном фонят форде форой фотка фотку фразе фрейм фрицы фрунт фторе фузея фуксу фунты фурия фурма фырча хазах халве хамом хамса ханам ханах ханом хаосу харчи харчу харям хатка хвату херес херим херит херуг хилус хирей хитам хитри хлада хламо хламу хлеба хлест хлоре хлору хмеля хозяи холуи холуя хорда хохлы хохми хохмы храму хранц храпе хрипя худая худом худым хулим цанге цангу цапни царёв царём царим цариц цвели цвету цветы целеб целый ценил ценна центр цепче церем цетан цикле цинга цисте цокай цыган цыкай чадах чайка чалам чалах чалая чанов часок часте чахло чвани чекан челам чёлах чёлка челна челок чемер чемод чепчи через череп черне черта чёрта черти често чётен четка четны четче чехия чехом чинен чинил чирик числа читав чичас чичер чомгу чреву чтёте чтила чуйка чуйке чулка чулку чумка чумку чухна чухны чухон являй явная ядрах язвой язвят якает якуту ялику ялтой ямаец ямкам ямкой ямные ямсом ярдах яркой ярост ярусы ясный ясным яткой яхонт`.split(
      " "
    );

  const session = await getServerSession();
  if (session && session.user && session.user.image) {
    const reqb = await req.json();
    const player = await pb.collection("whitelist").getFullList({
      filter: 'nickname~"' + reqb.nickname + '"',
      $autoCancel: false,
      headers: { key: String(process.env.POCKETBASE_KEY) },
    });
    const discord = await pb.collection("whitelist").getFullList({
      filter: 'discord~"' + reqb.id + '"',
      $autoCancel: false,
      headers: { key: String(process.env.POCKETBASE_KEY) },
    });
    if (player.length) {
      return Response.json({
        error: "name",
      });
    }
    if (discord.length) {
      return Response.json({
        error: "discord",
      });
    }
    if (reqb.promo) {
      const promo = await pb.collection("promos").getFullList({
        filter: 'code="' + reqb.promo + '"',
        $autoCancel: false,
        headers: { key: String(process.env.POCKETBASE_KEY) },
      });
      if (!promo.length) {
        return Response.json({
          error: "promo",
        });
      }
    }
    if ((await getTicketPlayByDiscord(reqb.id)).length > 0)
      return Response.json({
        id: (await getTicketPlayByDiscord(reqb.id))[0].id,
        error: "already",
      });
    const key = `${words[Math.floor(Math.random() * words.length)]} ${
      words[Math.floor(Math.random() * words.length)]
    } ${words[Math.floor(Math.random() * words.length)]} ${
      words[Math.floor(Math.random() * words.length)]
    } ${words[Math.floor(Math.random() * words.length)]}`;
    await createTicketPlay({
      phrase: key,
      promo: reqb.promo,
      user: {
        ...reqb,
      },
    });

    const ticket = (await getTicketPlayByDiscord(reqb.id))[0];

    // webhook
    if (process.env.DISCORD_WEBHOOK) {
      const data = {
        content: `## Новая заявка
### Phrase
${ticket.phrase}
### User
${ticket.user}
### Promo
${ticket.promo}
## Ticket id
${ticket.id}
`,
        username: "TicketAnnouncement",
        avatar_url:
          "https://cdn.discordapp.com/avatars/837341994962911313/867883fd8a0c25656c67adac2eb8be55.webp?size=32",
      };
      fetch(process.env.DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(async (res) => {
        console.log(res.status);
      });
    }

    return Response.json({
      key: key,
      error: false,
      id: ticket.id,
    });
  } else {
    return Response.json({ error: "unauthorized" });
  }
}
