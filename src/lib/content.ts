export type Step = {
  id: string;
  title: string;
  body: string;
  commands?: string[];
  note?: string;
};

export type Module = {
  slug: string;
  title: string;
  tagline: string;
  minutes: number;
  steps: Step[];
};

export type AcodeExtension = {
  slug: string;
  name: string;
  icon: string;
  description: string;
};

export const acodeExtensions: AcodeExtension[] = [
  {
    slug: "prettier",
    name: "Prettier",
    icon: "/extensions/acode.plugin.prettier.png",
    description: "Prettier is an opinionated code formatter that enforces a consistent style across your codebase.",
  },
  {
    slug: "theme",
    name: "Chai Theme",
    icon: "/extensions/acode.plugin.chaitheme.png",
    description: "Chai Theme, a stylish and customizable theme extension that brings a fresh, warm, and smooth look to your browsing experience.",
  },
  {
    slug: "emmet",
    name: "Emmet",
    icon: "/extensions/acode.plugin.emmet.png",
    description:
      "Expands short snippets into full HTML and CSS, saving hundreds of phone-keyboard taps.",
  },
    
  {
    slug: "extra-syntax-highlights-2.0",
    name: "Extra Syntax Highlights 2.0",
    icon: "/extensions/acode.plugin.extra_syntax_highlights.png",
    description: "Colorize your indent lines . Works in all modes and all themes",
  },
  {
    slug: "react/redux-snippets",
    name: "Acode ES7+ React/Redux snippets",
    icon: "/extensions/acode.react.snippets.png",
    description: "This plugin provides a collection of ES7+ React/Redux snippets to enhance your development workflow.",
  },
  {
    slug: "tailwindcss-intellisense",
    name: "Tailwindcss Intellisense",
    icon: "/extensions/acode.plugin.tailwindcss_intellisense.png",
    description: "Enhance your Acode editor with Tailwind CSS Autocompletion and intellisense for faster and more efficient development.",
  },
  {
    slug: "snippets",
    name: "Snippets",
    icon: "/extensions/acode.plugin.snippets.png",
    description: "Snippets plugin for the Ace and CodeMirror editors in Acode. It provides code autocompletion.",
  },
  {
    slug: "path-autocomplete",
    name: "Path Autocomplete",
    icon: "/extensions/acode.pathautocomplete.png",
    description: "Get path suggestions efficiently. Has a cache system. Performance is the main focus. Only triggers inside string Token",
  },

];

export const modules: Module[] = [
  {
    slug: "termux",
    title: "Termux: your Linux terminal",
    tagline: "Install the terminal emulator that powers everything else.",
    minutes: 10,
    steps: [
      {
        id: "termux-install",
        title: "Install Termux from F-Droid",
        body: "The Play Store build is frozen and broken. Download the F-Droid build of Termux, install it, and open it once so it unpacks the base system.",
        note: "Allow install from unknown sources when Android asks.",
      },
      {
        id: "termux-update",
        title: "Update the package index",
        body: "Refresh the package lists and upgrade everything that ships with the base image.",
        commands: ["pkg update && pkg upgrade -y"],
      },
      {
        id: "termux-storage",
        title: "Grant storage access",
        body: "This links your phone's shared storage into Termux so you can open project files in a text editor.",
        commands: ["termux-setup-storage"],
      },
      {
        id: "termux-essentials",
        title: "Install the essentials",
        body: "A compiler toolchain and a few CLI basics make later installs far less painful.",
        commands: ["pkg install -y git curl wget openssh nano"],
      },
      {
        id: "material-files",
        title: "Manage Termux files with Material Files",
        body: "Material Files is a file manager that can access your Termux storage from a graphical Android interface. It makes browsing, adding, moving, or deleting project files much more convenient than using terminal commands alone.",
        note: "Recommended Android Tool. Material Files is optional — you can continue doing everything through Termux commands if you prefer.",
      },
    ],
  },
  {
    slug: "node",
    title: "Node.js & npm",
    tagline: "The JavaScript runtime and its default package manager.",
    minutes: 8,
    steps: [
      {
        id: "node-install",
        title: "Install Node.js LTS",
        body: "Termux ships a maintained Node package. This gives you node and npm in one go.",
        commands: ["pkg install -y nodejs-lts", "node -v && npm -v"],
      },
      {
        id: "node-pnpm",
        title: "Speed up npm installs",
        body: "On a phone, install speed matters. Skip audit and funding checks to make npm installs noticeably faster.",
        commands: ["npm -v", "npm config get cache"],
      },
      {
        id: "node-cache",
        title: "Keep the cache off shared storage",
        body: "Shared storage is slow and case-insensitive. Keep node_modules inside the Termux home directory.",
        commands: ["cd ~ && mkdir -p projects && cd projects"],
      },
    ],
  },
  {
    slug: "acode",
    title: "Acode: the editor",
    tagline: "A real code editor with syntax highlighting and file trees.",
    minutes: 6,
    steps: [
      {
        id: "acode-install",
        title: "Install Acode",
        body: "Acode is a lightweight Android code editor with plugins, themes, and a built-in file browser.",
      },
      {
        id: "acode-folder",
        title: "Open your Termux projects folder",
        body: "In Acode, add a folder and pick the Termux home you exposed with storage setup, so the editor and terminal see the same files.",
        commands: ["ln -s ~/projects ~/storage/shared/projects"],
        note: "Now ~/projects shows up in your phone's file manager and in Acode.",
      },
      {
        id: "acode-plugins",
        title: "Add useful plugins",
        body: "Install the Prettier-style formatter and an icon pack from the Acode plugin store to make long files readable on a small screen.",
      },
    ],
  },
  {
    slug: "git",
    title: "Git & GitHub",
    tagline: "Version control and pushing from your phone.",
    minutes: 9,
    steps: [
      {
        id: "git-identity",
        title: "Set your identity",
        body: "Every commit records a name and email. Set them once.",
        commands: [
          'git config --global user.name "Your Name"',
          'git config --global user.email "you@example.com"',
        ],
      },
      {
        id: "git-key",
        title: "Create an SSH key",
        body: "Typing a password on a phone keyboard for every push is misery. Use a key instead.",
        commands: ['ssh-keygen -t ed25519 -C "phone"', "cat ~/.ssh/id_ed25519.pub"],
        note: "Copy the printed key and paste it into GitHub under Settings, SSH and GPG keys.",
      },
      {
        id: "git-clone",
        title: "Clone and push",
        body: "Confirm the connection works end to end.",
        commands: ["ssh -T git@github.com", "git clone git@github.com:you/repo.git"],
      },
    ],
  },
  {
    slug: "react",
    title: "React with Vite",
    tagline: "Scaffold and run a React app on the phone.",
    minutes: 7,
    steps: [
      {
        id: "react-create",
        title: "Create the project",
        body: "Vite's React template is small enough to install comfortably on mobile hardware.",
        commands: ["cd ~/projects", "npm create vite@latest my-app --template react-ts"],
      },
      {
        id: "react-install",
        title: "Install dependencies",
        body: "Expect one to three minutes on a mid-range phone.",
        commands: ["cd my-app && npm install"],
      },
      {
        id: "react-run",
        title: "Run the dev server",
        body: "Start the server, then open the printed address in your phone's browser.",
        commands: ["npm run dev -- --host 127.0.0.1 --port 5173"],
        note: "Keep Termux in the foreground or enable its wake lock, or Android will suspend the server.",
      },
    ],
  },
  {
    slug: "nextjs",
    title: "Next.js",
    tagline: "A full-stack framework, tuned for limited RAM.",
    minutes: 10,
    steps: [
      {
        id: "next-create",
        title: "Scaffold the app",
        body: "Answer the prompts; choosing TypeScript and the App Router is a good default.",
        commands: ["cd ~/projects", "npm create next-app@latest my-next-app"],
      },
      {
        id: "next-memory",
        title: "Cap the memory Node can use",
        body: "Without a cap, the build can be killed by Android's memory manager mid-compile.",
        commands: ['export NODE_OPTIONS="--max-old-space-size=1024"'],
        note: "Add that line to ~/.bashrc so it applies to every session.",
      },
      {
        id: "next-run",
        title: "Develop and build",
        body: "Dev mode is comfortable; full production builds are the heaviest thing you will run.",
        commands: ["npm run dev", "npm run build"],
      },
    ],
  },
];

export const allSteps = modules.flatMap((m) => m.steps.map((s) => ({ ...s, module: m.slug })));

export type ToolPair = {
  task: string;
  pc: string;
  android: string;
  gap: "same" | "close" | "workaround";
  detail: string;
};

export const toolPairs: ToolPair[] = [
  {
    task: "Terminal",
    pc: "bash / PowerShell",
    android: "Termux",
    gap: "same",
    detail: "A real Linux userland with a package manager. Nearly everything you know transfers.",
  },
  {
    task: "Code editor",
    pc: "VS Code",
    android: "Acode",
    gap: "close",
    detail:
      "Syntax highlighting, plugins, multi-file editing. No integrated debugger or extension marketplace of the same depth.",
  },
  {
    task: "Runtime",
    pc: "Node.js",
    android: "Node.js (Termux)",
    gap: "same",
    detail: "The same V8 runtime, same npm registry, same scripts.",
  },
  {
    task: "Version control",
    pc: "Git + GitHub Desktop",
    android: "Git CLI",
    gap: "close",
    detail: "Full Git on the command line. Graphical merge tools are the thing you give up.",
  },
  {
    task: "Browser devtools",
    pc: "Chrome DevTools",
    android: "Eruda / remote debug",
    gap: "workaround",
    detail:
      "Inject Eruda for an on-device console, or use USB remote debugging from another machine when you need the real panel.",
  },
  {
    task: "Databases",
    pc: "MongoDB + Mongoose + Compass",
    android: "MongoDB + Mongoose + Mongodroid",
    gap: "close",
    detail:
      "MongoDB and Mongoose work identically on both platforms. On PC, use MongoDB Compass to browse your data. On Android, Mongodroid lets you connect with your connection string and manage databases directly from your phone.",
  },
  {
    task: "Containers",
    pc: "Docker",
    android: "proot-distro",
    gap: "workaround",
    detail:
      "No kernel namespaces without root. proot-distro gives you a Debian or Ubuntu rootfs instead.",
  },
  {
    task: "Deploys",
    pc: "CLI deploys",
    android: "CLI deploys",
    gap: "same",
    detail: "Vercel, Netlify, and Cloudflare CLIs all run under Termux and behave identically.",
  },
];

export type Issue = {
  id: string;
  title: string;
  symptoms: string;
  fix: string;
  commands?: string[];
  tags: string[];
};

export const issues: Issue[] = [
  {
    id: "signature-mismatch",
    title: "Termux install fails with a signature error",
    symptoms: "App not installed, or a conflicting-signature message when installing Termux.",
    fix: "You have a Play Store build installed. Uninstall every Termux app and add-on, then install only F-Droid builds.",
    tags: ["termux", "install"],
  },
  {
    id: "repo-unreachable",
    title: "pkg update fails to fetch repositories",
    symptoms: "Could not resolve host, or repository entries returning 403.",
    fix: "Switch to a closer mirror and retry.",
    commands: ["termux-change-repo", "pkg update"],
    tags: ["termux", "network"],
  },
  {
    id: "npm-eacces",
    title: "npm install fails with permission errors",
    symptoms: "EACCES or EPERM while writing node_modules.",
    fix: "The project lives on shared storage, which does not support the permissions npm needs. Move it into the Termux home.",
    commands: ["mv ~/storage/shared/my-app ~/projects/my-app"],
    tags: ["node", "npm", "storage"],
  },
  {
    id: "oom-kill",
    title: "The build dies silently partway through",
    symptoms: "Killed, or the process ends with no error at all.",
    fix: "Android reclaimed the memory. Cap Node's heap and close background apps before building.",
    commands: ['export NODE_OPTIONS="--max-old-space-size=1024"'],
    tags: ["next", "memory", "build"],
  },
  {
    id: "server-sleeps",
    title: "The dev server stops when you switch apps",
    symptoms: "The page stops reloading, or the browser cannot connect after a minute.",
    fix: "Enable the Termux wake lock from its notification, and disable battery optimisation for Termux in Android settings.",
    tags: ["termux", "battery"],
  },
  {
    id: "localhost-refused",
    title: "The browser refuses the connection to localhost",
    symptoms: "Connection refused at localhost:5173.",
    fix: "Bind the dev server explicitly to the loopback address and use the same port in the browser.",
    commands: ["npm run dev -- --host 127.0.0.1 --port 5173"],
    tags: ["vite", "network"],
  },
  {
    id: "watchers",
    title: "Too many open files during dev",
    symptoms: "ENOSPC or EMFILE when the watcher starts.",
    fix: "Reduce watched files by excluding large folders, or restart Termux to release handles.",
    commands: ["ulimit -n 4096"],
    tags: ["vite", "node"],
  },
  {
    id: "git-permission",
    title: "GitHub rejects your push",
    symptoms: "Permission denied (publickey).",
    fix: "The SSH key is missing or not loaded. Regenerate it, add the public half to GitHub, then test the connection.",
    commands: ["ssh -T git@github.com"],
    tags: ["git", "ssh"],
  },
  {
    id: "slow-install",
    title: "Installs take many minutes",
    symptoms: "npm install crawls on every project.",
    fix: "Reuse npm's cache and skip audit and funding checks on a phone; verify the cache occasionally instead of reinstalling from scratch.",
    commands: ["npm cache verify"],
    tags: ["npm", "performance"],
  },
];

export const glossary: { term: string; definition: string; category: string }[] = [
  {
    term: "Termux",
    definition:
      "An Android app that gives you a Linux command line and package manager without rooting the phone.",
    category: "Tools",
  },
  {
    term: "Package manager",
    definition:
      "A program that downloads, installs, and updates software for you. pkg for Termux, npm for JavaScript.",
    category: "Core",
  },
  {
    term: "Node.js",
    definition:
      "A runtime that lets JavaScript run outside a browser, which is how build tools and servers written in JavaScript work.",
    category: "Core",
  },
  {
    term: "npm",
    definition: "The default JavaScript package manager and the registry it downloads from.",
    category: "Core",
  },
  {
    term: "Repository",
    definition: "A folder tracked by Git, with a full history of every change.",
    category: "Git",
  },
  {
    term: "Commit",
    definition: "A saved snapshot of your changes with a message describing them.",
    category: "Git",
  },
  {
    term: "Push",
    definition: "Sending your local commits up to a remote host like GitHub.",
    category: "Git",
  },
  {
    term: "SSH key",
    definition: "A pair of files that proves who you are to a server, replacing a typed password.",
    category: "Git",
  },
  {
    term: "Dev server",
    definition:
      "A local program that serves your site while you work and reloads it when files change.",
    category: "Web",
  },
  {
    term: "Localhost",
    definition: "A name for the device you are on. Your phone talking to itself.",
    category: "Web",
  },
  {
    term: "Port",
    definition: "A numbered channel on a device. 5173 and 3000 are common for dev servers.",
    category: "Web",
  },
  {
    term: "Vite",
    definition: "A fast build tool and dev server, commonly used to start React projects.",
    category: "Web",
  },
  {
    term: "React",
    definition: "A library for building user interfaces out of reusable components.",
    category: "Web",
  },
  {
    term: "Next.js",
    definition:
      "A framework built on React that adds routing, server rendering, and backend endpoints.",
    category: "Web",
  },
  {
    term: "Build",
    definition: "The step that turns your source files into optimised files a server can ship.",
    category: "Web",
  },
  {
    term: "node_modules",
    definition:
      "The folder holding every dependency your project downloaded. Large, and never edited by hand.",
    category: "Core",
  },
  {
    term: "Wake lock",
    definition:
      "A request that stops Android from suspending an app, needed to keep a dev server alive.",
    category: "Android",
  },
  {
    term: "proot-distro",
    definition: "A Termux add-on that runs a full Linux distribution inside Termux without root.",
    category: "Android",
  },
  {
    term: "Shared storage",
    definition:
      "The part of your phone's storage that file managers can see. Slower and less permissive than the Termux home.",
    category: "Android",
  },
];
