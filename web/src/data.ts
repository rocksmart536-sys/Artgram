// Données fictives. Ajoutez `src: '/images/xxx.png'` (dossier public/images) pour utiliser vos propres images.
export type Artist = { id: string; name: string; handle: string; bio: string; hue: number; src?: string }
export type PostT = { id: string; artist: string; title: string; caption: string; likes: string; hue: number; cat: string; ratio: string; time: string; src?: string }

export const artists: Artist[] = [
  { id: 'leanime', name: 'leanime008', handle: '@lean_ily', bio: 'Passionné de dessins, j’adore les chats aussi et la musique 😺🫶🏽', hue: 285, src: '/images/avatar1.jpg' },
  { id: 'maya', name: 'Maya', handle: '@maya_draws', bio: 'Manga & portraits. Commissions ouvertes.', hue: 330, src: '/images/avatar2.jpg' },
  { id: 'aru', name: 'aru', handle: '@aru_art', bio: 'Illustration digitale et colorisation.', hue: 190, src: '/images/avatar3.jpg' },
  { id: 'kobi', name: 'Kobi', handle: '@kobi_graff', bio: 'Grafiti, encre et couleurs vives.', hue: 70, src: '/images/avatar4.jpg' },
]
export const artist = (id: string) => artists.find(a => a.id === id) ?? artists[0]

export const categories = ['Tous', 'manga', 'Tradi', 'Digital', 'Grafiti', 'colorisation']

export const posts: PostT[] = [
  { id: 'p1', artist: 'maya', title: 'cute girl', caption: 'Je l’ai fini en un temps record cette fois. Admirer 6h de travail', likes: '12,4k', hue: 330, cat: 'manga', ratio: '383/262', time: 'il y a une heure', src: '/images/dessin1.jpg' },
  { id: 'p2', artist: 'aru', title: 'ciel violet', caption: 'Test de palette sur fond nocturne.', likes: '8,1k', hue: 270, cat: 'Digital', ratio: '381/254', time: 'il y a une heure', src: '/images/dessin2.jpg' },
  { id: 'p3', artist: 'leanime', title: 'chat endormi', caption: 'Croquis du soir, crayon et encre.', likes: '3,2k', hue: 40, cat: 'Tradi', ratio: '4/5', time: 'il y a 3 heures', src: '/images/dessin3.jpg' },
  { id: 'p4', artist: 'kobi', title: 'mur néon', caption: 'Grafiti sur papier, version finale.', likes: '5,7k', hue: 75, cat: 'Grafiti', ratio: '1/1', time: 'hier', src: '/images/dessin4.jpg' },
  { id: 'p5', artist: 'maya', title: 'aquarelle', caption: 'Colorisation test, merci pour vos retours.', likes: '2,9k', hue: 190, cat: 'colorisation', ratio: '3/4', time: 'hier', src: '/images/dessin5.jpg' },
  { id: 'p6', artist: 'aru', title: 'portrait', caption: 'Portrait digital, 4h.', likes: '9,3k', hue: 10, cat: 'Digital', ratio: '4/5', time: 'il y a 2 jours', src: '/images/dessin6.jpg' },
]

export const tutorialCats = ['Tout', 'Dessin', 'Colorisation', 'Anatomie', 'Digital Art']
export const tutorials = [
  { id: 't1', title: 'Dessiner un visage de face', cat: 'Dessin', dur: '12:40', hue: 300 },
  { id: 't2', title: 'Colorisation : lumière et ombres', cat: 'Colorisation', dur: '18:05', hue: 190 },
  { id: 't3', title: 'Anatomie : les mains', cat: 'Anatomie', dur: '09:22', hue: 20 },
  { id: 't4', title: 'Premiers pas en Digital Art', cat: 'Digital Art', dur: '24:10', hue: 255 },
]

export const orders = [
  { id: 'o1', title: 'Portrait personnalisé', artist: 'maya', status: 'En cours', price: '25 €', hue: 330 },
  { id: 'o2', title: 'Illustration de couverture', artist: 'aru', status: 'Livrée', price: '40 €', hue: 190 },
  { id: 'o3', title: 'Mascotte chat', artist: 'kobi', status: 'En attente', price: '15 €', hue: 75 },
]

export type Msg = { me: boolean; text?: string; img?: string; time: string }
export type Chat = { id: string; artist: string; last: string; time: string; unread: number; msgs: Msg[] }
export const chats: Chat[] = [
  { id: 'c1', artist: 'maya', last: 'Je commence ton portrait demain !', time: '18:30', unread: 2, msgs: [
    { me: true, text: 'Salut Maya, ta commande est-elle ouverte ?', time: '18:12' },
    { me: false, text: 'Oui ! Dis-moi ce que tu veux.', time: '18:20' },
    { me: false, text: 'Je commence ton portrait demain !', time: '18:30' } ] },
  { id: 'c2', artist: 'aru', last: 'Merci pour le like 💜', time: 'Hier', unread: 0, msgs: [
    { me: true, text: 'Ton dernier ciel violet est magnifique', time: 'Hier' },
    { me: false, text: 'Merci pour le like 💜', time: 'Hier' } ] },
  { id: 'c3', artist: 'kobi', last: 'On fait ça en grafiti ?', time: 'Lun.', unread: 1, msgs: [{ me: false, text: 'On fait ça en grafiti ?', time: 'Lun.' }] },
]

export type Notif = { id: string; type: 'follow' | 'like' | 'comment' | 'reply' | 'mention' | 'order' | 'message'; artist: string; text: string; time: string; unread: boolean; to: string; post?: string }
export const notifs: Notif[] = [
  { id: 'n1', type: 'like', artist: 'maya', text: 'a aimé votre publication', time: 'il y a 5 min', unread: true, to: '/publication/p3', post: 'p3' },
  { id: 'n2', type: 'follow', artist: 'aru', text: 'a commencé à vous suivre', time: 'il y a 1 h', unread: true, to: '/artiste/aru' },
  { id: 'n3', type: 'mention', artist: 'kobi', text: 'vous a mentionné dans un commentaire', time: 'il y a 3 h', unread: true, to: '/publication/p4', post: 'p4' },
  { id: 'n4', type: 'comment', artist: 'maya', text: 'a commenté : « Superbe trait ! »', time: 'hier', unread: false, to: '/publication/p3', post: 'p3' },
  { id: 'n5', type: 'order', artist: 'aru', text: 'a livré votre commande', time: 'hier', unread: false, to: '/commissions' },
  { id: 'n6', type: 'message', artist: 'maya', text: 'vous a envoyé un message', time: 'lun.', unread: false, to: '/discussions/c1' },
]
