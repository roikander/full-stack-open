// komponentti, joka sisältää Reactissa mahdollisia inline-tyylejä
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic'
  }

  return (
    <div style={footerStyle}>
      <br />
      <h4>Note app, Department of Computer Science, University of Helsinki 2025 </h4>
      <p>Comments and minor modifications by Risto Jaskari, Centria University of Applied Sciences, 2026 </p>
    </div>
  )
}

export default Footer
