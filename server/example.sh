#!/bin/sh

set -e


curl 'localhost:3000/rooms/room2/messages?_sort=time&_order=asc'
