#!/bin/bash
echo "Generating proto..."

# Funciona
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:. --grpc_out=. chatapi.proto
