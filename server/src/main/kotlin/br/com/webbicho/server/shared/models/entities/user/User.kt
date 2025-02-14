package br.com.webbicho.server.shared.models.entities.user

import br.com.webbicho.server.shared.models.entities.WbEntity
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.validation.constraints.Size

@Entity
class User(
	@Column(nullable = false, unique = true, length = 30)
	@field:Size(max = 30)
	var username: String
) : WbEntity()
