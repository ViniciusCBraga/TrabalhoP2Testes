# Sistema Escolar

Este projeto é um sistema escolar desenvolvido para a disciplina de Testes Unitários e Gerenciamento de Projetos. O sistema permite gerenciar informações de alunos, professores, turmas e disciplinas. Foi implementado utilizando Prisma, Neon, Cloudinary e Clerk, com foco na aplicação de testes unitários para garantir a qualidade do código.

## Tecnologias Utilizadas

- **Prisma**: ORM para integração com banco de dados, facilitando o gerenciamento de dados relacionais.
- **Neon**: Plataforma de banco de dados PostgreSQL na nuvem.
- **Cloudinary**: Plataforma de gestão de imagens, usada para armazenar fotos de perfis de usuários e documentos importantes.
- **Clerk**: Autenticação e gerenciamento de identidade de usuários, proporcionando segurança na autenticação do sistema.

## Funcionalidades

- **Gerenciamento de Alunos e Professores**: Registre, edite, remova e consulte informações de alunos e professores.
- **Gerenciamento de Disciplinas e Turmas**: Crie turmas e disciplinas, atribuindo alunos e professores conforme necessário.
- **Autenticação de Usuários**: Sistema de login e autenticação seguro utilizando o Clerk.
- **Upload e Gestão de Imagens**: Upload de fotos de perfil e documentos através do Cloudinary.
- **Testes Unitários**: Aplicação de testes unitários para garantir a qualidade e funcionalidade do sistema.

## Estrutura do Projeto

- **Backend**: Implementado com Node.js e Prisma para gerenciamento de dados e interação com o banco de dados PostgreSQL (Neon).
- **Frontend**: Interface de usuário desenvolvida em React, proporcionando uma experiência simples e direta para a interação com o sistema.
- **Banco de Dados**: O Neon (PostgreSQL) é utilizado como banco de dados principal para armazenar informações de alunos, professores e turmas.
- **Armazenamento de Arquivos**: Cloudinary gerencia o armazenamento e exibição de imagens no sistema.

## Testes

Este projeto implementa testes unitários em diferentes partes do código, como:

- **Testes de Controllers**: Verificação das respostas das rotas de controle de usuários, turmas e disciplinas.
- **Testes de Repositório**: Garantia de que as operações de banco de dados (CRUD) estão funcionando corretamente com o Prisma.
- **Testes de Integração**: Validação do fluxo de dados entre as diferentes camadas do sistema.

## Instalação

1. Clone este repositório:
   ```bash
   git clone <url-do-repositório>
