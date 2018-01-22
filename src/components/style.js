module.exports = `
    body {
      margin: 0px;
    }
    nav {
      position: fixed;
      background-color: grey;
      width: 100%;
      top: 0;
      z-index: 1;
      /* padding: 0px 10px 0px 10px; */
    }
    .space-for-nav {
      display: block;
      padding: 10px;
      opacity: 0;
    }

    nav td {
      padding: 10px;
      margin: 0px;
      /* background-color: white; */
      /* float: left; */
      /* border-width: 1px;
      border-color: white; */
    }

    main section {
      display: none;
      background-color: white;
    }
    main section:target {
      display: block;
    }
`;