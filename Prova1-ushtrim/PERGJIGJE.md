# Përgjigjet — Prova 1

## P1.7

Çfarë bën box-sizing: border-box? Jep një shembull nga faqja jote që përfshin width, padding dhe border. Përgjigju në 2–3 fjali.

Përgjigjja ime: Me `box-sizing: border-box`, `width` e përfshin edhe padding-un dhe border-in, kështu që kutia nuk bëhet më e gjerë se sa e kemi caktuar. Te `.cards` kam `max-width: 900px`, `padding: 2rem` dhe `border: 2px`: me border-box kutia mbetet maksimalisht 900px, ndërsa pa të do të ishte 900 + 64 + 4 = 968px. Kjo, bashkë me heqjen e `width: 900px` fikse, e ndalon daljen jashtë ekranit në 360 px.

## P1.8

Pse përdoret a për lidhjen Detaje, ndërsa button për një veprim si “Shfaq/Fshih tekstin”? Referoju një lidhjeje nga faqja jote. Nuk duhet të implementosh buton ose JavaScript.

Përgjigjja ime: Elementi `a` përdoret për lundrim, pra të çon diku: lidhja `<a href="#info">Detaje</a>` të dërgon te seksioni `#info`. `button` përdoret për një veprim në të njëjtën faqe, si shfaqja ose fshehja e tekstit, që nuk ndryshon adresën. Kështu shfletuesi dhe lexuesit e ekranit e dinë saktë çfarë bën elementi dhe si aktivizohet me tastierë.
