const projects = [
  // {
  //   name: "Movie Database",
  //   time: "Aug 2024 - present",
  //   link: "https://bingogamemaker.com",
  //   status: false,
  //   bullets: [
  //     "Developed a full-stack movie management application, enabling efficient CRUD operations, by leveraging React, Node.js, and MySQL for dynamic filtering and data management.",
  //     "Engineered RESTful APIs with Express.js, ensuring seamless data validation and integration, by creating a robust back-end that interacts smoothly with the front-end.",
  //     "Automated movie data extraction and management, streamlining data entry processes, by creating custom Tampermonkey scripts to pull data from external web pages.",
  //     "Designed and managed a MySQL database schema, ensuring data integrity and optimizing query performance, by implementing proper indexing and relational design principles."
  //   ],
  //   tags: ["React", "Full Stack", "Node.js", "Express.js", "MySQL", "JavaScript", "Tampermonkey"]
  // },
  {
    name: "Bingo Game Maker",
    time: "Jul 2024",
    link: "https://bingogamemaker.com",
    status: true,
    bullets: [
      "Developed a React-based website that enables users to easily create and customize Bingo games, providing an intuitive platform for generating and sharing Bingo games.",
      "Implemented features allowing users to fill out Bingo games via links or QR codes, and share their completed cards as images with friends.",
      "Achieved user engagement with the website garnering hundreds of visits since its launch, demonstrating its utility and appeal."
    ],
    tags: ["React"]
  },
  {
    name: "Copy LinkedIn Job Description",
    time: "Jun 2024",
    link: "https://greasyfork.org/en/scripts/504174-copy-job-description",
    status: true,
    bullets: [
      "Developed a Tampermonkey script using JavaScript that allows users to copy LinkedIn job descriptions directly to the clipboard in Markdown format, improving workflow efficiency.",
      "(In Progress) Leverage LLMs to automatically summarize key highlights from the job description, offering quick insights and further improving efficiency."
    ],
    tags: ["Tampermonkey", "JavaScript"]
  },
  {
    name: "Peer Evaluation App",
    time: "Feb 2024 - Present",
    link: "https://github.com/yourusername/project-three",
    status: false,
    bullets: [
      "Developed a cross-platform mobile application (iOS and Android) for the BMED department at Georgia Tech, using React Native for the front-end and Express.js, Node.js, and MySQL for the back-end.",
      "Facilitated seamless communication between the mobile app and the server by implementing RESTful APIs using Express.js and Node.js.",
      "Improved data storage and retrieval efficiency by designing and managing a MySQL database schema to support real-time peer evaluation functionalities."
    ],
    tags: ["React Native", "Node.js", "MySQL", "Express.js", "Full Stack"]
  },
  // {
  //   name: "Chatroom",
  //   time: "Feb 2024",
  //   link: "https://github.com/yourusername/project-three",
  //   status: true,
  //   bullets: [
  //     "Developed a multi-client chat room application using socket programming to enable real-time communication between clients on a single server.",
  //     "Implemented server-side authentication and advanced user interactions by verifying client passcodes, managing user connections, and supporting text-based commands for emotions, time display, and direct messaging."
  //   ],
  //   tags: ["Socket Programming", "Python"]
  // },
  // {
  //   name: "P2P App",
  //   time: "Mar 2024",
  //   link: "https://github.com/yourusername/project-three",
  //   status: true,
  //   bullets: [
  //     "Developed a Peer-to-Peer (P2P) file transfer system using a client-server architecture where P2PClients exchange file chunks with each other to enable the reconstruction of full file-sets from distributed peers.",
  //     "Implemented a P2PTracker server that tracks and manages file chunk availability across multiple clients, facilitating efficient and dynamic file retrieval in the P2P network."
  //   ],
  //   tags: ["Socket Programming", "Python"]
  // },
  {
    name: "Twitter Clone",
    time: "Sep 2022 - Dec 2022",
    link: "https://github.com/Jinwoo-1162/Buzzer",
    status: true,
    bullets: [
      "Built a full-stack web application using the MERN tech stack to replicate core functionalities of Twitter.",
      "Designed and managed the back-end architecture by crafting the schema, controllers, and routers in Node.js and Express.js to ensure efficient data management and API interactions with MongoDB.",
      "Enhanced user experience by designing and implementing the Explore page with features such as new tweet submissions, searching, and trending tweet sorting."
    ],
    tags: ["React", "Node.js", "MongoDB", "Express.js", "Full Stack"]
  },
  // Add more projects as needed
];

export default projects;
