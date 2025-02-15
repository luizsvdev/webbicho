package br.com.webbicho.server.shared.entities

import br.com.webbicho.server.shared.enums.EUserRole
import jakarta.persistence.*

@Entity(name = "users")
@Table(
	indexes = [
		Index(name = "idx_user", columnList = "username, email, role"),
	],
)
class User(
	@Column(
		nullable = false,
		unique = true,
		length = 30
	)
	var username: String? = null,
	
	@Column(nullable = false)
	var exibitionName: String? = null,
	
	@Column(
		nullable = false,
		unique = true,
		length = 320
	)
	var email: String? = null,
	
	@Column(columnDefinition = "TEXT", nullable = true)
	var about: String? = null,
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	var role: EUserRole? = EUserRole.USER,
	
	@Column(columnDefinition = "TEXT", nullable = true)
	var avatar: String? = null,
	
	@OneToMany(
		mappedBy = "user",
		cascade = [CascadeType.REMOVE],
		orphanRemoval = true,
		fetch = FetchType.LAZY
	)
	private val posts: MutableList<Post> = mutableListOf(),
	
	@OneToMany(
		mappedBy = "user",
		cascade = [CascadeType.REMOVE],
		orphanRemoval = true,
		fetch = FetchType.LAZY
	)
	private val comments: MutableList<Comment> = mutableListOf()
) : WbEntity()
