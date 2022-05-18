const GA = () => {
    return (`
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LLNFQYFHBF"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-LLNFQYFHBF');
    </script>`)
}

export default GA;