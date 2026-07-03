# Developer Resources

## About Cora

DiVA is built on top of the open-source platform Cora.

Cora is a name that references the English word "core." It is a generic system, not DiVA itself, but DiVA is built on Cora.

Cora is a metadata-driven system. This means the entire system is defined in metadata, such as record types, value lists, variables, texts, presentations, etc., and these definitions are directly available through the API.

The goal of the REST API is to fully support other clients (other platforms such as Android or iOS, integrations with other systems, servers as clients, or others who want to build their own interfaces for DiVA). The entire system is accessible through the API. It also enables the DiVA maintenence team to change forms and presentations without changing the client.

The development of Cora is also continuously made available as open source on [GitHub](https://github.com/lsu-ub-uu).

## REST API

Documentation for the DiVA REST API is available here: [REST](/rest/).

The API provides, in the same way as the client, access to create, read, update, delete, validate, and index records, as well as upload and download binaries. The API supports both XML and JSON.

## JSClient

An alternative client with the same data and the same permissions as in the DiVA client. This client is more technical and exposes the metadata more clearly.

You can find JSClient here: [JSClient](/jsclient).
