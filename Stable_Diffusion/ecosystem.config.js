module.exports = {
  apps: [
    {
      name: "sb-app",
      script: "/home/dev/sb-app/venv/bin/python3",
      args:
        "main.py",
      watch: false,
      interpreter: "",
    },
    {
      name: "worker",
      script: "/home/dev/sb-app/venv/bin/python3",
      args: "-m celery -A main.celery worker --loglevel=info -Q sb --concurrency=1",
      watch: false,
      interpreter: ""
    }
  ]
};
