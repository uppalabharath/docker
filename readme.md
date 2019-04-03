## Docker
	1. docker version gives the info about the docker server and docker cli we are using 
	2. Docker Server (Daemon) is the actual software that deals with images and containers
	3. Docker CLI is the tool used to interact with docker daemon
	4. docker run hello-world
	5. A docker uses namespacing and control group techniques to achieve the container
	6. The name spacing and control group are native to Linux and so when we install Docker for Windows / Mac we installed a Linux VM along with it 
	7. The Linmux Kernel in the VM is the Kernel that actually responds to the commands from the containers and not the host machine in case of Mac / windows
	8. docker version gives the info of the OS we are using in docker server
	9. docker run commands fetches the filesystem snapshot and the startup command to be executed
		docker run -p <port_on_machine>:<port_on_container> <image_id/tag> -- forwards the requests from port on machine to port on container 
	10. the default command can be overridden. 
		docker run <image_name> [<command_to_execute>]
		> If command_to_execute is not provided, the default command would be run 
	11. list all running containers docker ps
		> list all container ever created / run -- docker ps --all
	12. docker run = docker create + docker start -a <container_id> 
		> -a specifies the start command to stream the output the container is giving us out 
		> The containers created would be still available and can be restarted but the default startup cannot me modified for already created 
		container
		> -d flag would run the container in background mode
	13. Removing stopped containers -- docker system prune 
		> would also delete the build cache
	14. Logs from container -- docker logs <container_id>
		> docker ps -- gives the running containers
		> docker ps --all gives the info of all the containers that are atleast created / run once
		> docker system prune -- to remove / purge unused containers and images cache
	15. Stopping contaimer 
		docker stop <container_id> 
			Sends the container process a sigterm Signal for termination of process and shut down container
			The container gets time to run its shut down tasks like cleaing up temp files
		docker kill <container_id>
			Sends the container process a sigkill Signal for immediate shutdown of container without any additional actions
		Usually docker stop is used to stop containers unless the container doesnt respond to stop we kill it using kill command
		If docker stop doesnt get the container shutdown in 10 seconds, docker automatically issues kill command
	16. Multi command containers
		docker exec -it <container_id> <command_to_execute_in_container>
			* Without it flag the container opens redis-cli and immediately turns it off as it didnt receive any command or input
			* i flag keeps open STDIN channel of the command we executed. Like an interactive session
			* t flag is generally for a neat formatted output and opens up a pseudo terminal 
			* docker exec -it <container_id> sh to open a shell in the container. [sh, bash are examples of command processors]
	17. Every Process in Linux has three channels STDIN STDOUT & STDERR
		* STDIN -- to provide info to the process
		* STDOUT -- to give output to terminal / stream like file
		* STDERR -- same as STDOUT but used for Errors
	18. We can run docker run -it command to start a container and open up a terminal directly. But this prevents the docker to run the predefined startup command
	19. Creating docker images
		* DockerFile is the file that comtains all the config
		* this is input for Docker daemon to create an image out of it
	20. Dockerfile
		* Specify the baseimage
		* run additional commands and install tools as needed
		* specify the default startup command
		* Instructions are prsent in the Dockerfile to create the container when the image is used
			FROM -- to specofy the base image
			RUN -- to run some cammands / setup configs
			CMD -- command that gets executed when the container is started. The default startup command
			COPY -- from <local file system realtive to build context> to <container/image FS> 
			WORKDIR -- Working directory inside the container. Any instructions after this command are relative to this path. System creates the folders if necessary
		* flow of Dockerfile execution
			- FROM 
				- gets the base image and creates a temp image or uses cache
			- Every subsequent command the following would be done
				- spawns a container using above temp image 
				- runs the specified instructions on this new temp container
				- Creates the new temp image using the new FS snapshot
			- Once all the instructions are executed the image built from the last step contains all the configs and startup command settings we did. 
	21. Docker images are tagged so that they can be run using the tag rather than with image id 
		* docker build -t <docker_id>/<image_name>:<version> .-- Usually version is here called tag and the other info is the repo
		* . is the build context
		* docker server keeps the intermediate images in cache to speed up the image building process in subsequent runs
		* So it is usually recommended to add the commands as below as possible 
	22. We can create images from the container. Actually that what even Docker does after running each instruction
		* command we use is docker commit 
			- spawn a container using the base image and get the shell -- docker run -it alpine sh
			- install the dependencies and the config you want to make in the shell 
			- go to a new terminal and run docker ps to get the details of this container
			- Issue docker commkt -c 'CMD ["<startup-command>"]' <container_id>
			- The above command outputs an image id and that can be used to spawn the containers with the same config
	23. Usually we have multiple containers running and these container should communicate for the proper working of the application
		* to establish this network infra between containers there are two options a. docker cli b. docker compose
		* docker cli 
			- Bit tough to set up 
			- need to write different commands again and again 
		* docker compose
			- Installs along with docker
			- can be used to run multiple docker instances and these instances are connected together via network
			- Automates some of the commands we use with docker
			- Uses docker-compose.yml to do the tasks
			- docker-compose up == docker run myImage
			- docker build . + docker run myImage == docker-compose up --build
			- docker-compose down


