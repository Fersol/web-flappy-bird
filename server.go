package main

import (
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	RootDirectory := http.FileServer(http.Dir("public"))
	http.Handle("/", RootDirectory)
	http.ListenAndServe(":"+port, nil)
}
