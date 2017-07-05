# DigitalOcean

https://github.com/digitalocean/doctl
https://www.digitalocean.com/community/tutorials/how-to-use-doctl-the-official-digitalocean-command-line-client

### Recipe DO.1: Manage API tokens
Go to https://cloud.digitalocean.com/settings/api/tokens

### Recipe DO.2: Setup DigitalOcean CLI on a new machine
1. `curl -L https://github.com/digitalocean/doctl/releases/download/v1.5.0/doctl-1.5.0-darwin-10.6-amd64.tar.gz | tar xz`
3. `sudo mv ./doctl /usr/local/bin`
4. `doctl auth init`
5. It prompts to enter a DO token. See Recipe `DO.1`.
6. You are done. Enter `doctl` to see available commands.


### Recipe DO.3: Create a new droplet

```
doctl compute droplet create pesposa --image image_slug --size 512mb --region datacenter_region --ssh-keys ssh_key_fingerprint`
```

- Once you run the above command visit https://cloud.digitalocean.com/droplets to see your newly create droplet. Or `doctl compute droplet list` to see a list of your droplets.
- Grab an existing SSH key fingerprint from here: https://cloud.digitalocean.com/settings/security
- Use the following command to get the [list of available images](https://developers.digitalocean.com/documentation/v2/#images) (see `DO.1` for getting an API token). Typically you'll want to use `--image ubuntu-16-04-x64`.

```
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer ${API_TOKEN}" "https://api.digitalocean.com/v2/images?per_page=199" | jq
```
- Use the following command to get the [list of available datacenter regions](https://developers.digitalocean.com/documentation/v2/#regions) and available sizes. Typically you'll want use `--size 515mb` and `--region fra1`.

```
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer ${API_TOKEN}" "https://api.digitalocean.com/v2/regions" | jq
```
