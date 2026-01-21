export default function VintagePostersBackground() {
  return (
    <>
      {/* Vintage movie posters background collage */}
      <div className="vintage-poster" style={{
        width: 'min(220px, 15vw)',
        height: 'min(320px, 22vw)',
        top: '8%',
        left: '5%',
        transform: 'rotate(-8deg)',
        backgroundImage: 'url(https://pub-cf1d1f8a481e4af89879163f7898602b.r2.dev/images/monsters.png)'
      }} />
      <div className="vintage-poster" style={{
        width: 'min(200px, 14vw)',
        height: 'min(300px, 20vw)',
        top: '65%',
        left: '8%',
        transform: 'rotate(-12deg)',
        backgroundImage: 'url(https://pub-cf1d1f8a481e4af89879163f7898602b.r2.dev/images/witch.png)'
      }} />
      <div className="vintage-poster" style={{
        width: 'min(190px, 13vw)',
        height: 'min(290px, 19vw)',
        top: '22%',
        right: '12%',
        transform: 'rotate(7deg)',
        backgroundImage: 'url(https://pub-cf1d1f8a481e4af89879163f7898602b.r2.dev/images/church.png)'
      }} />
      <div className="vintage-poster" style={{
        width: 'min(210px, 14vw)',
        height: 'min(310px, 21vw)',
        bottom: '12%',
        right: '18%',
        transform: 'rotate(-10deg)',
        backgroundImage: 'url(https://pub-cf1d1f8a481e4af89879163f7898602b.r2.dev/images/lagoon.png)'
      }} />
      <div className="vintage-poster" style={{
        width: 'min(195px, 13vw)',
        height: 'min(295px, 19vw)',
        bottom: '5%',
        left: '40%',
        transform: 'rotate(5deg)',
        backgroundImage: 'url(https://pub-cf1d1f8a481e4af89879163f7898602b.r2.dev/images/castle.png)'
      }} />
    </>
  )
}
